import { createStore } from 'redux'

import { reducer } from './reducer'
import { loadPreparedState } from './persist'

const preloadedState = loadPreparedState()

const store = createStore(reducer, preloadedState)

export { store }
