import { combineReducers } from 'redux'

import { clearPersistData } from '../persist'

import { reducer as shipList } from './ship-list'
import { reducer as expedConfigs } from './exped-configs'
import { reducer as ui } from './ui'
import { reducer as language } from './language'

import { mergeObject } from './merge-object'

const internReducer = combineReducers({
  shipList,
  expedConfigs,
  language,
  ui,
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
