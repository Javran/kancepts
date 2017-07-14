import _ from 'lodash'
import { createSelector } from 'reselect'

import { filters } from '../../ship-filters'
import {
  shipListUISelector,
  shipListSelector,
  shipDetailListSelector,
  costPickerSelector,
} from '../../selectors'

const searchAndAddUISelector = createSelector(
  shipListUISelector,
  shipListSelector,
  ({searchAndAdd}, shipList) => {
    const {masterId} = searchAndAdd
    const count = shipList.filter(s => s.id === masterId).length
    return {...searchAndAdd, count}
  })


// create a comparator assuming the getter projects a numeric value from elements
const getter2Comparator = getter => (x,y) => getter(x)-getter(y)
const getterByPropName = propName => s => s[propName]

const chainComparators = (...cmps) => (x,y) => {
  for (let i=0; i<cmps.length; ++i) {
    const result = cmps[i](x,y)
    if (result !== 0)
      return result
  }
  return 0
}

const masterIdComparator = getter2Comparator(getterByPropName('masterId'))
const rosterIdComparator = getter2Comparator(getterByPropName('rosterId'))
const resolvingComparator =
  chainComparators(masterIdComparator,rosterIdComparator)

const sortMethods = _.fromPairs(
  ['stype', 'fuel', 'ammo', 'sumFuelAmmo'].map(propName =>
    [
      propName,
      chainComparators(
        getter2Comparator(getterByPropName(propName)),
        resolvingComparator),
    ]))

/*
   assuming ship to have following fields:

   stype, masterId, rosterId, fuel, ammo, sumFuelAmmo

 */
const shipTransformFuncSelector = createSelector(
  shipListUISelector,
  ({filter,sort}) => {
    const filterFunc =
      filters.find(x => x.id === filter).func
    const filterTransform = xs => xs.filter(filterFunc)
    const {method, reversed} = sort
    const comparator = sortMethods[method]
    const sortTransform = xs => xs.sort(comparator)

    // here it's save to use _.reverse
    // given than filtered result is a newly generated Array
    // which is "pipelined" and cannot be referred to
    const mayReverse = reversed ? _.reverse : _.identity

    return _.flow([
      filterTransform,
      sortTransform,
      mayReverse,
    ])
  })

const shipViewListSelector = createSelector(
  costPickerSelector,
  shipDetailListSelector,
  shipTransformFuncSelector,
  ({fuelPercent, ammoPercent},shipDetailList, tranformFunc) => {
    const fuelCostFactor = fuelPercent / 100
    const ammoCostFactor = ammoPercent / 100
    return tranformFunc(shipDetailList.map(s => {
      const {fuelCost, ammoCost} =
        s.computeCost(fuelCostFactor,ammoCostFactor)
      return {
        ...s,
        fuel: fuelCost,
        ammo: ammoCost,
        sumFuelAmmo: fuelCost+ammoCost,
      }
    }))
  })

export {
  searchAndAddUISelector,
  shipViewListSelector,
}
