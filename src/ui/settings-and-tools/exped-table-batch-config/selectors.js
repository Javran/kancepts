import { createSelector } from 'reselect'

import { settingsSelector } from '../selectors'
import {
  prepareFilterFunc,
} from '../../../store/reducer/ui/settings/exped-table-batch-config'

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
  prepareFilterFunc)

const selectedExpedsSelector = createSelector(
  expedBatchConfigSelector,
  s => s.selected)

export {
  expedBatchConfigSelector,
  filterStateSelector,
  filterFuncSelector,
  selectedExpedsSelector,
}
