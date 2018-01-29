import _ from 'lodash'
import { observer } from 'redux-observers'
import {
  filterStateSelector,
} from './selectors'
import { modifyObject } from 'subtender'
import { expedInfoList } from '../../../exped-info'
import {
  mapDispatchToProps,
  prepareFilterFunc,
} from '../../../store/reducer/ui/settings/exped-table-batch-config'

const filterStateObserver = observer(
  filterStateSelector,
  (dispatch, current, previous) => {
    if (! _.isEqual(current,previous) &&
        ! _.isEmpty(current)) {
      const func = prepareFilterFunc(current)
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
  }
)

export { filterStateObserver }
