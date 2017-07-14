import { combineReducers } from 'redux'
import * as table from './table'
import * as planner from './planner'
import * as currentTab from './current-tab'
import * as dlcLab from './dlc-lab'
import * as settings from './settings'
import * as costPicker from './cost-picker'

const reducer = combineReducers({
  table: table.reducer,
  planner: planner.reducer,
  currentTab: currentTab.reducer,
  dlcLab: dlcLab.reducer,
  settings: settings.reducer,
  costPicker: costPicker.reducer,
})

export {
  reducer,
}
