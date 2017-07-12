import { combineReducers } from 'redux'
import * as expedTableBatchConfig from './exped-table-batch-config'

const reducer = combineReducers({
  expedTableBatchConfig: expedTableBatchConfig.reducer,
})

export { reducer }
