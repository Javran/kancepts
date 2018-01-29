import { observer, observe } from 'redux-observers'
import shallowEqual from 'shallowequal'

import {
  plannerConfigSelector,
} from './selectors'

import { store } from './store'
import { mapDispatchToProps } from './store/reducer/ui/planner/results'
import { computePlannerResults } from './compute-planner-results'
import { persistStateObserver } from './store/persist'
import * as expedTableBatchConfig from './ui/settings-and-tools/exped-table-batch-config/observer'

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
    expedTableBatchConfig.filterStateObserver,
  ])

export { observeAll }
