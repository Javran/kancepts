import { combineReducers } from 'redux'

import * as shipList from './ship-list'
import * as expedConfigs from './exped-configs'

// TODO:
// - need a observer to observe changes on slice of store needed to be serialized,
//   and write to localStorage when necessary
// - preload state from localStorage

const reducer = combineReducers({
  shipList: shipList.reducer,
  expedConfigs: expedConfigs.reducer,
})

export {
  reducer,
}
