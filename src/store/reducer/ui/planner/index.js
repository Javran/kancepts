import { combineReducers } from 'redux'
import { reducer as config } from './config'
import { reducer as results } from './results'

const reducer = combineReducers({
  config,
  results,
})

export {
  reducer,
}
