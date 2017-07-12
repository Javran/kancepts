import { createSelector } from 'reselect'

import { uiSelector } from '../../selectors'

const settingsSelector = createSelector(
  uiSelector,
  ui => ui.settings)

const expedBatchConfigSelector = createSelector(
  settingsSelector,
  s => s.expedTableBatchConfig)

export {
  settingsSelector,
  expedBatchConfigSelector,
}
