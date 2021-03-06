import _ from 'lodash'
import { createSelector } from 'reselect'

import { $ships, $shipTypes } from './master-data.js'
import { filters } from './ship-filters'
import {
  expedInfoList,
  applyIncomeModifier,
  computeResupplyInfo,
  onResourceValue,
  resourceProperties,
  allExpedIdList,
} from './exped-info'
import { defExpedConfig } from './store/reducer/exped-configs'

import { i18nInstances } from './i18n'

const shipListSelector = state => state.shipList
const expedConfigsSelector = state => state.expedConfigs
const uiSelector = state => state.ui
const languageSelector = state => state.language

const currentTabSelector = createSelector(
  uiSelector,
  ui => ui.currentTab)

const dlcLabUISelector = createSelector(
  uiSelector,
  ui => ui.dlcLab)

const shipResupplyCost = ship => {
  // "after marriage modifier":
  // - if there's no consumption before marriage, no consumption applied after marriage either.
  // - consumption is applied with 0.85 and then floor is taken, with a minimum cost of 1
  const applyAfterMarriage =
    v => (v === 0) ? 0 : Math.max(1, Math.floor(v*0.85))
  const modifier = ship.ring ? applyAfterMarriage : _.identity
  return (fuelCostFactor, ammoCostFactor) => {
    const fuelCost = Math.floor( ship.maxFuel * fuelCostFactor )
    const ammoCost = Math.floor( ship.maxAmmo * ammoCostFactor )
    return {
      fuelCost: modifier(fuelCost),
      ammoCost: modifier(ammoCost),
    }
  }
}

const shipDetailListSelector = createSelector(
  shipListSelector,
  shipList => {
    const shipToDetail = ship => {
      const {ring, rosterId} = ship
      const masterId = ship.id
      const $ship = $ships[masterId]
      if (!$ship)
        return null

      const stype = $ship.api_stype
      const shipName = $ship.api_name
      const typeName = $shipTypes[stype].api_name
      const maxFuel = $ship.api_fuel_max
      const maxAmmo = $ship.api_bull_max

      return {
        masterId,
        rosterId,
        stype,
        typeName,
        shipName,
        ring,
        computeCost: shipResupplyCost({ring,maxFuel,maxAmmo}),
      }
    }
    const shipDetailList = _.compact(shipList.map(shipToDetail))
    return shipDetailList
  })

const shipCostListByFilterSelector = createSelector(
  shipDetailListSelector,
  shipDetailList => {
    const mkPair = filterInfo => {
      const {id,func} = filterInfo
      const filteredShipList = shipDetailList
        .filter(func)
      return [id, filteredShipList]
    }
    const shipCostListByFilter = _.fromPairs(filters.map(mkPair))
    return shipCostListByFilter
  })

const scan = (xs, acc, zero) => {
  const ys = new Array(xs.length+1)
  ys[0] = zero
  for (let i=0; i<xs.length; ++i) {
    ys[i+1] = acc(ys[i],xs[i])
  }
  return ys
}

/*

   costModel is a function:
   - costModel(<CostPercent>)(<ShipType>,<Count>) = <ActualCost>

   - CostPercent: {fuelPercent, ammoPercent}, where both fuelPercent and ammoPercent
     are integers between 0~100 (inclusive)
   - ShipType: ship filter id
   - Count: an integer >= 0
   - ActualCost:
     - {fuelCost, ammoCost} (might include other fields like 'fleet')
     - or null if the number of qualified ships is not sufficient

   TODO:

   - consider memoize if necessary

 */
const costModelSelector = createSelector(
  shipCostListByFilterSelector,
  shipCostListByFilter => {
    // filterId is ShipType.
    const costModel = ({fuelPercent, ammoPercent}) => (filterId,count) => {
      const fuelCostFactor = fuelPercent / 100
      const ammoCostFactor = ammoPercent / 100

      // sort by cost lowest cost
      const shipCostListWithDup =
        shipCostListByFilter[filterId]
          .map(s => {
            const {fuelCost, ammoCost} = s.computeCost(fuelCostFactor,ammoCostFactor)
            return {...s, fuelCost, ammoCost, fleet: [s]}
          })
          .sort((x,y) => (x.fuelCost+x.ammoCost) - (y.fuelCost+y.ammoCost))

      // remove duplication
      const shipCostList = []
      {
        const masterIdSet = new Set()
        for (let i=0; i<shipCostListWithDup.length; ++i) {
          const ship = shipCostListWithDup[i]
          if (masterIdSet.has(ship.masterId))
            continue
          shipCostList.push(ship)
          masterIdSet.add(ship.masterId)
        }
      }

      const plusCost = (x,y) => ({
        fuelCost: x.fuelCost + y.fuelCost,
        ammoCost: x.ammoCost + y.ammoCost,
        fleet: [...x.fleet, ...y.fleet],
      })
      const accumulatedCostList = scan(
        shipCostList,
        plusCost,
        {fuelCost: 0, ammoCost: 0, fleet: []})

      return accumulatedCostList.length > count ? accumulatedCostList[count] : null
    }
    return costModel
  })

const tableUISelector = createSelector(
  uiSelector,
  ui => ui.table)

const plannerSelector = createSelector(
  uiSelector,
  ui => ui.planner)

const plannerConfigSelector = createSelector(
  plannerSelector,
  planner => planner.config)

const plannerResultsSelector = createSelector(
  plannerSelector,
  planner => planner.results)

const expedViewSortFunctionSelector = createSelector(
  tableUISelector,
  tableControl => {
    const sortSpec = tableControl.sort
    const idGetter = expedView => expedView.id
    const timeGetter = expedView => expedView.info.time
    const resourceGetter = rp =>
      expedView => {
        const v = expedView.showResource[rp]
        return v === null ? -Infinity : v
      }
    const getterToComparator = (getter, flip=false) =>
      (x,y) => {
        const xVal = getter(x)
        const yVal = getter(y)
        return flip ? yVal-xVal : xVal-yVal
      }

    const idComparator = getterToComparator(idGetter)
    /* eslint-disable indent */
    const comparator =
      sortSpec.method === 'id' ?
        idComparator :
      sortSpec.method === 'time' ?
        getterToComparator(timeGetter) :
      resourceProperties.includes(sortSpec.method) ?
        getterToComparator(resourceGetter(sortSpec.method),true) :
      console.error(`unknown sort method: ${sortSpec.method}`)
    /* eslint-enable indent */
    // use idComparator as tiebreaker
    const resolvedComparator = (x,y) => {
      const result = comparator(x,y)
      return result === 0 ? idComparator(x,y) : result
    }

    return xs => {
      let ys = [...xs]
      ys = ys.sort(resolvedComparator)
      if (sortSpec.reversed)
        ys = ys.reverse()
      return ys
    }
  })

const makeExpedIncomeSelector = expedId => createSelector(
  expedConfigsSelector,
  costModelSelector,
  (expedConfigs, costModel) => {
    const id = expedId
    const info = expedInfoList.find(ei => ei.id === id)
    if (!info) {
      return {
        basic: null, gross: null, net: null, resupplyInfo: null,
      }
    }
    const {cost} = info
    const costModelPartial = costModel(cost)
    const basic = info.resource
    // TODO: serves as a tmp fix
    const config = expedConfigs[expedId] || defExpedConfig
    const gross =
      applyIncomeModifier(config.modifier)(basic)
    const resupplyInfo =
      computeResupplyInfo(config.cost)(info,costModelPartial)

    const applyResupply = (val, rp) => {
      if (rp === 'fuel' || rp === 'ammo') {
        if (!resupplyInfo || resupplyInfo.cost === null)
          return null
        return val - resupplyInfo.cost[rp]
      } else {
        return val
      }
    }
    const net = onResourceValue(applyResupply)(gross)
    return {
      basic,
      gross,
      net,
      resupplyInfo,
    }
  })

const expedIncomesSelector = createSelector(
  allExpedIdList.map(makeExpedIncomeSelector),
  (...incomes) => _.fromPairs(_.zip(allExpedIdList,incomes)))

// expedition info for viewing on exped table UI
const expedInfoViewListSelector = createSelector(
  expedConfigsSelector,
  tableUISelector,
  expedIncomesSelector,
  expedViewSortFunctionSelector,
  (expedConfigs, tableControl, expedIncomes, sortFunc) => {
    const incomeViewMethod = tableControl.view.income
    const divideMethod = tableControl.view.divide
    const expedInfoViewList = expedInfoList.map(info => {
      const {id} = info
      const config = expedConfigs[id] || defExpedConfig
      const expedIncome = expedIncomes[id]
      const {resupplyInfo} = expedIncome
      const showResourceTotal =
        ['basic','gross','net'].includes(incomeViewMethod) ?
          expedIncome[incomeViewMethod] :
          console.error(`unknown income view method: ${incomeViewMethod}`)
      const resourceDivide = val =>
        val === null ? null : (val*60/info.time)
      /* eslint-disable indent */
      const showResource =
        divideMethod === 'total' ?
          showResourceTotal :
        divideMethod === 'hourly' ?
          onResourceValue(resourceDivide)(showResourceTotal) :
        console.error(`unknown divide method: ${divideMethod}`)
      /* eslint-enable indent */
      return {
        id,
        info,
        config,
        showResource,
        resupplyInfo,
      }
    })
    return sortFunc(expedInfoViewList)
  })

// provide `tr` and `trN` function according to language
const translateSelector = createSelector(
  languageSelector,
  lang => {
    const i18nInst = i18nInstances[lang]
    const tr = i18nInst.__.bind(i18nInst)
    const trN = i18nInst.__n.bind(i18nInst)
    return {tr, trN}
  })

const costPickerSelector = createSelector(
  uiSelector,
  ui => ui.costPicker)

const shipListUISelector = createSelector(
  uiSelector,
  ui => ui.shipList)

export {
  shipDetailListSelector,
  shipCostListByFilterSelector,
  costModelSelector,
  expedConfigsSelector,
  uiSelector,
  currentTabSelector,
  dlcLabUISelector,
  tableUISelector,
  plannerConfigSelector,
  plannerResultsSelector,
  makeExpedIncomeSelector,
  expedIncomesSelector,
  expedInfoViewListSelector,
  languageSelector,
  translateSelector,
  costPickerSelector,
  shipListSelector,
  shipListUISelector,
}
