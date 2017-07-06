import { createStore } from 'redux'

import { reducer } from './reducer'
import { loadPreparedState } from './persist'

const preloadedState = loadPreparedState()

try {
  const raw = localStorage.expedConfigs
  if (typeof raw !== 'undefined') {
    preloadedState.expedConfigs =
      JSON.parse(localStorage.expedConfigs)
  }
} catch (e) {
  console.error('error while parsing expedConfigs', e)
}

const store = createStore(reducer, preloadedState)

export { store }
