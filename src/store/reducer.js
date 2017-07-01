import { combineReducers } from 'redux'
import defaultShipList from '../assets/default-ship-list.json'

// NOTE: shipList, as a reducer, should provide a default value when it's missing
// it's preloadedState that loads user settings and has it passed to this reducer.
const shipList = (state = defaultShipList, _action) => {
  return state
}

// TODO:
// - need a observer to observe changes on slice of store needed to be serialized,
//   and write to localStorage when necessary
// - preload state from localStorage

const reducer = combineReducers({shipList})

export {
  reducer,
}
