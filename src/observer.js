import { observer, observe } from 'redux-observers'
import {
  expedConfigsSelector,
  plannerConfigSelector,
} from './selectors'

import { store } from './store'
import { allExpedIdList } from './exped-info'
import { shallowEqual } from './utils'
import { mapDispatchToProps } from './store/reducer/ui/planner/results'
import { computePlannerResults } from './compute-planner-results'

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

const plannerConfigObserver = observer(
  plannerConfigSelector,
  (dispatch, current, previous) => {
    if (current === null ||
        typeof current !== 'object') {
      return
    }
    if (!shallowEqual(current, previous)) {
      computePlannerResults(
        store.getState(),
        results =>
          mapDispatchToProps(dispatch).modifyResults(() =>
            results))
    }
  },
  {skipInitialCall: false}
)

const observeAll = () =>
  observe(store, [
    expedConfigsObserver,
    plannerConfigObserver,
  ])

export { observeAll }
