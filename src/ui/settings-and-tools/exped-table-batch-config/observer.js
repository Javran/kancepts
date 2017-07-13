import _ from 'lodash'
import { observer } from 'redux-observers'
import {
  filterStateSelector,
  filterFuncSelector,
} from './selectors'
import { modifyObject } from '../../../utils'
import { expedInfoList } from '../../../exped-info'
import {
  mapDispatchToProps,
} from '../../../store/reducer/ui/settings/exped-table-batch-config'
import { store } from '../../../store'

const filterStateObserver = observer(
  filterStateSelector,
  (dispatch, current, previous) => {
    if (! _.isEqual(current,previous)) {
      const func = filterFuncSelector(store.getState())
      const selected =
        expedInfoList.filter(func).map(ei => ei.id)
      mapDispatchToProps(dispatch)
        .modifyBatchConfig(
          modifyObject(
            'selected',
            () => selected
          )
        )
    }
  })

export { filterStateObserver }
