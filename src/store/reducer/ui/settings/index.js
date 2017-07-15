import { combineReducers } from 'redux'
import { reducer as expedTableBatchConfig } from './exped-table-batch-config'

const reducer = combineReducers({
  expedTableBatchConfig,
})

export { reducer }
