import { combineReducers } from 'redux'

import { clearPersistData } from '../persist'

import * as shipList from './ship-list'
import * as expedConfigs from './exped-configs'
import * as ui from './ui'
import * as language from './language'

import { mergeObject } from './merge-object'

const internReducer = combineReducers({
  shipList: shipList.reducer,
  expedConfigs: expedConfigs.reducer,
  language: language.reducer,
  ui: ui.reducer,
})

const reducer = (state, action) => {
  let curState = state
  if (action.type === 'root@reset') {
    clearPersistData()
    curState = undefined
  }
  if (action.type === 'root@merge') {
    const {srcState} = action
    return mergeObject(state, srcState)
  }
  return internReducer(curState, action)
}

const mapDispatchToProps = dispatch => ({
  factoryReset: () => dispatch({
    type: 'root@reset',
  }),
  merge: srcState => dispatch({
    type: 'root@merge',
    srcState,
  }),
})

export {
  reducer,
  mapDispatchToProps,
}
