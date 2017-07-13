import { combineReducers } from 'redux'

import * as shipList from './ship-list'
import * as expedConfigs from './exped-configs'
import * as ui from './ui'

const internReducer = combineReducers({
  shipList: shipList.reducer,
  expedConfigs: expedConfigs.reducer,
  ui: ui.reducer,
})

const reducer = (state, action) => {
  let curState = state
  if (action.type === 'root@reset') {
    curState = undefined
  }
  return internReducer(curState, action)
}

const mapDispatchToProps = dispatch => ({
  factoryReset: () => dispatch({
    type: 'root@reset',
  }),
})

export {
  reducer,
  mapDispatchToProps,
}
