import { combineReducers } from 'redux'
import * as table from './table'
import * as planner from './planner'

const reducer = combineReducers({
  table: table.reducer,
  planner: planner.reducer,
})

export {
  reducer,
}
