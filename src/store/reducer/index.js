import { combineReducers } from 'redux'

import * as shipList from './ship-list'
import * as expedConfigs from './exped-configs'
import * as ui from './ui'

const reducer = combineReducers({
  shipList: shipList.reducer,
  expedConfigs: expedConfigs.reducer,
  ui: ui.reducer,
})

export {
  reducer,
}
