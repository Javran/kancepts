import { combineReducers } from 'redux'
import * as config from './config'
import * as results from './results'

const reducer = combineReducers({
  config: config.reducer,
  results: results.reducer,
})

export {
  reducer,
}
