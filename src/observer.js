import { observer, observe } from 'redux-observers'
import {
  plannerConfigSelector,
} from './selectors'

import { store } from './store'
import { shallowEqual } from './utils'
import { mapDispatchToProps } from './store/reducer/ui/planner/results'
import { computePlannerResults } from './compute-planner-results'
import { persistStateObserver } from './store/persist'

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
    persistStateObserver,
    plannerConfigObserver,
  ])

export { observeAll }
