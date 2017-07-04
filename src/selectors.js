import _ from 'lodash'
import { createSelector } from 'reselect'

import { $ships, $shipTypes } from './master-data.js'
import { filters } from './ship-filters'
import {
  expedInfoList,
  applyIncomeModifier,
  computeResupplyInfo,
  onResourceValue,
} from './exped-info'

const shipListSelector = state => state.shipList
const expedConfigsSelector = state => state.expedConfigs
const uiSelector = state => state.ui

// TODO: list sorting perhaps after we have redux setups.
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
    const shipToDetail = (ship,ind) => {
      const mstId = ship.id
      const ring = ship.ring
      const $ship = $ships[mstId]
      const stype = $ship.api_stype
      const shipName = $ship.api_name
      const typeName = $shipTypes[stype].api_name
      const maxFuel = $ship.api_fuel_max
      const maxAmmo = $ship.api_bull_max

      return {
        mstId,
        stype,
        typeName,
        shipName,
        ring,
        computeCost: shipResupplyCost({ring,maxFuel,maxAmmo}),
        key: ind,
      }
    }
    const shipDetailList = shipList.map(shipToDetail)
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
     - {fuelCost, ammoCost} (might include other fields like 'nameList')
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

      // sort and select first <count> ships with lowest cost
      const shipCostList =
        shipCostListByFilter[filterId]
          .map(s => {
            const {fuelCost, ammoCost} = s.computeCost(fuelCostFactor,ammoCostFactor)
            return {...s, fuelCost, ammoCost, nameList: [s.shipName]}
          })
          .sort((x,y) => (x.fuelCost+x.ammoCost) - (y.fuelCost+y.ammoCost))

      const plusCost = (x,y) => ({
        fuelCost: x.fuelCost + y.fuelCost,
        ammoCost: x.ammoCost + y.ammoCost,
        nameList: [...x.nameList, ...y.nameList],
      })
      const accumulatedCostList = scan(
        shipCostList,
        plusCost,
        {fuelCost: 0, ammoCost: 0, nameList: []})

      return accumulatedCostList.length > count ? accumulatedCostList[count] : null
    }
    return costModel
  })

const tableUISelector = createSelector(
  uiSelector,
  ui => ui.table)

// expedition info for viewing on exped table UI
const expedInfoViewListSelector = createSelector(
  expedConfigsSelector,
  tableUISelector,
  costModelSelector,
  (expedConfigs, tableControl, costModel) => {
    const incomeViewMethod = tableControl.view.income
    const expedInfoViewList = expedInfoList.map(info => {
      const {id,cost} = info
      const costModelPartial = costModel(cost)
      const config = expedConfigs[id]
      const basicResource = info.resource
      const grossResource =
        applyIncomeModifier(config.modifier)(basicResource)
      const resupplyInfo =
        computeResupplyInfo(config.cost)(info,costModelPartial)
      const applyResupply = (val, rp) => {
        if (rp === 'fuel' || rp === 'ammo') {
          if (resupplyInfo.cost === null)
            return null
          return val - resupplyInfo.cost[rp]
        } else {
          return val
        }
      }
      const netResource = onResourceValue(applyResupply)(grossResource)
      const showResource =
        incomeViewMethod === 'basic' ? basicResource :
        incomeViewMethod === 'gross' ? grossResource :
        incomeViewMethod === 'net' ? netResource :
        console.error(`unknown income view method: ${incomeViewMethod}`)
      return {
        id,
        info,
        config,
        showResource,
        resupplyInfo,
      }
    })
    return expedInfoViewList
  })

export {
  shipDetailListSelector,
  shipCostListByFilterSelector,
  costModelSelector,
  expedConfigsSelector,
  uiSelector,
  tableUISelector,
  expedInfoViewListSelector,
}
