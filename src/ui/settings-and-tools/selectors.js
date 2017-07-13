import { createSelector } from 'reselect'

import { uiSelector } from '../../selectors'

const settingsSelector = createSelector(
  uiSelector,
  ui => ui.settings)

export {
  settingsSelector,
}
