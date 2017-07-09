import { combineReducers } from 'redux'
import * as table from './table'
import * as planner from './planner'
import * as currentTab from './current-tab'

const reducer = combineReducers({
  table: table.reducer,
  planner: planner.reducer,
  currentTab: currentTab.reducer,
})

export {
  reducer,
}
