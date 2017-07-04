import { observer, observe } from 'redux-observers'
import { expedConfigsSelector } from './selectors'

import { store } from './store'
import { allExpedIdList } from './exped-info'

const expedConfigsObserver = observer(
  expedConfigsSelector,
  (_dispatch, current, previous) => {
    if (current === null || typeof current !== 'object' ||
        previous === null || typeof previous !== 'object')
      return
    // on any config change
    if (allExpedIdList.some(expedId =>
      current[expedId] !== previous[expedId])) {
      localStorage.expedConfigs = JSON.stringify(current)
    }
  })

const observeAll = () =>
  observe(store, [expedConfigsObserver])

export { observeAll }
