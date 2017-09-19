import _ from 'lodash'
import { createStore } from 'redux'

import { reducer } from './reducer'
import { loadPreparedState } from './persist'

import { mapDispatchToProps as mdtpShipList } from './reducer/ship-list'
import { $ships } from '../master-data'

const preloadedState = loadPreparedState()

const store = createStore(reducer, preloadedState)

window.getStore = store.getState

/*
   shiplist import format:

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

   to construct what's after 'sl=' from poi:

   encodeURIComponent(
     Object.values(getStore().info.ships).map(x =>
       `${x.api_lv>99?'r':''}${x.api_ship_id}`).join(',')
   )

 */

setTimeout(() => {
  const {location, history} = window
  const searchString = location.search
  history.replaceState(null, '', location.pathname)

  if (!searchString)
    return

  const params = new URLSearchParams(searchString)
  // normalize: remove duplicated keys (only the first occurrence is kept)
  const pairs = _.uniqBy(
    [...params.entries()],
    ([k]) => k
  )

  pairs.map(([kRaw,vRaw]) => {
    const k = kRaw.toLowerCase()

    if (k === 'sl') {
      try {
        const newShipList =
          _.flatMap(
            decodeURIComponent(vRaw).split(','),
            // parse
            raw => {
              const parsed = /^\s*(r?)(\d+)\s*$/i.exec(raw)
              if (parsed) {
                const [_ignored, rFlag, rawShipId] = parsed
                const ring = Boolean(rFlag)
                const id = Number(rawShipId)
                return [{ring,id}]
              } else {
                console.error(`invalid ship id: ${raw}`)
                return []
              }
            }
          ).map((x,ind) => {
            const {id} = x
            if (_.isEmpty($ships[id])) {
              console.warn(`Unknown ship id ${id} while importing ship list`)
            }
            // extend with rosterId
            return {...x, rosterId: ind+1}
          })
        mdtpShipList(store.dispatch).modifyShipList(() =>
          newShipList)
      } catch (e) {
        console.error('error while processing "sl" import params', e)
      }
      return
    }

    console.error(`unrecognized key: ${kRaw}`)
  })
})

export { store }
