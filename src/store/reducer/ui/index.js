import { combineReducers } from 'redux'
import * as table from './table'
import * as planner from './planner'
import * as currentTab from './current-tab'
import * as dlcLab from './dlc-lab'

const reducer = combineReducers({
  table: table.reducer,
  planner: planner.reducer,
  currentTab: currentTab.reducer,
  dlcLab: dlcLab.reducer,
})

export {
  reducer,
}
