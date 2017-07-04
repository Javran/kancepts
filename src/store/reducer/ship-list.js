import fp from 'lodash/fp'
import rawDefaultShipList from '../../assets/default-ship-list.json'

/*
   shipList will always use the same representation at runtime:

   {
     id: <master id>,
     ring: <boolean>, // married or not
   }

   but additionally simply passing a number `id` should be interpreted as `{id, ring: false}`.

 */

const normalizeShip = s => {
  if (typeof s === 'number') {
    return {id: s, ring: false}
  }
  if (s !== null && typeof s === 'object' &&
      typeof s.id === 'number' &&
      typeof s.ring === 'boolean') {
    const {id,ring} = s
    return {id,ring}
  }
  console.error(`Unexpect ship structure`)
}

const normalizeShipList = fp.map(normalizeShip)
const defaultShipList = normalizeShipList(rawDefaultShipList)

// NOTE: shipList, as a reducer, should provide a default value when it's missing
// it's preloadedState that loads user settings and has it passed to this reducer.
const reducer = (state = defaultShipList, _action) => {
  return state
}

export { reducer }
