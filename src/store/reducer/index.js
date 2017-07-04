import { combineReducers } from 'redux'

import { shipList } from './ship-list'
import { expedConfigs } from './exped-configs'

// TODO:
// - need a observer to observe changes on slice of store needed to be serialized,
//   and write to localStorage when necessary
// - preload state from localStorage

const reducer = combineReducers({
  shipList,
  expedConfigs,
})

export {
  reducer,
}
