import { combineReducers } from 'redux'
import { reducer as table } from './table'
import { reducer as planner } from './planner'
import { reducer as currentTab } from './current-tab'
import { reducer as dlcLab } from './dlc-lab'
import { reducer as settings } from './settings'
import { reducer as costPicker } from './cost-picker'
import { reducer as shipList } from './ship-list'

const reducer = combineReducers({
  table,
  planner,
  currentTab,
  dlcLab,
  settings,
  costPicker,
  shipList,
})

export {
  reducer,
}
