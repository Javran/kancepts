import { combineReducers } from 'redux'
import * as table from './table'

const reducer = combineReducers({
  table: table.reducer,
})

export {
  reducer,
}
