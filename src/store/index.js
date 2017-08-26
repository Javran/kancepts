import { createStore } from 'redux'

import { reducer } from './reducer'
import { loadPreparedState } from './persist'

const preloadedState = loadPreparedState()

const store = createStore(reducer, preloadedState)

window.getStore = store.getState

/*
   TODO: shiplist import format:

   '?sl=<encoded>'

   <encoded> should be an comma separated list encoded by encodeURIComponent

   - every element is a number indicating ship id.
   - an optional prefix 'R' / 'r' can be prefixed to the ship id indicating a married ship

   - example:

     - r318: Ryuuhou Kai (married)
     - r185: Ryuuhou (married)
     - r184: Taigei (married)
     - 393: Ark Royal (not married)

     putting together:

     - r318,r185,r184,393
     - r318%2Cr185%2Cr184%2C393 (encoded by encodeURIComponent)
     - so the final search string should be: '?sl=r318%2Cr185%2Cr184%2C393'

 */

setTimeout(() => {
  const searchString = window.location.search
  console.log(window.location)
  console.log(searchString)
})

export { store }
