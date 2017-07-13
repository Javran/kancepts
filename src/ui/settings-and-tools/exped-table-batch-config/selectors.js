import { createSelector } from 'reselect'

import { settingsSelector } from '../selectors'

const expedBatchConfigSelector = createSelector(
  settingsSelector,
  s => s.expedTableBatchConfig)

const filterStateSelector = createSelector(
  expedBatchConfigSelector,
  s => {
    const {filter} = s
    // connective makes sense only when both (the other two) are enabled
    const connectiveEnabled =
      filter.expedTime.enabled && filter.resourceSum.enabled
    return {
      ...filter,
      connective: {
        ...filter.connective,
        enabled: connectiveEnabled,
      },
    }
  })

const filterFuncSelector = createSelector(
  filterStateSelector,
  ({expedTime, resourceSum, connective}) => {
    const expedTimeFunc = expedTime.enabled ?
      (ei => ei.time >= expedTime.value) :
      () => true
    const resourceSumFunc = resourceSum.enabled ?
      (ei => ei.resourceSum >= resourceSum.value) :
      () => true

    if (connective.enabled) {
      const binary =
        connective.value === 'and' ? ((x,y) => x && y) :
        connective.value === 'or' ? ((x,y) => x || y) :
        console.error(`Invalid connective: ${connective.value}`)
      return ei => binary(expedTimeFunc(ei), resourceSumFunc(ei))
    } else {
      return ei => expedTimeFunc(ei) && resourceSumFunc(ei)
    }
  })

const selectedExpedsSelector = createSelector(
  expedBatchConfigSelector,
  s => s.selected)

export {
  expedBatchConfigSelector,
  filterStateSelector,
  filterFuncSelector,
  selectedExpedsSelector,
}
