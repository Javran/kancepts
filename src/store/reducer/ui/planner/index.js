import { combineReducers } from 'redux'
import * as config from './config'

const reducer = combineReducers({
  config: config.reducer,
})

export {
  reducer,
}
