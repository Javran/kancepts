import { combineReducers } from 'redux'

import * as shipList from './ship-list'
import * as expedConfigs from './exped-configs'

const reducer = combineReducers({
  shipList: shipList.reducer,
  expedConfigs: expedConfigs.reducer,
})

export {
  reducer,
}
