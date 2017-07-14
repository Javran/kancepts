import fp from 'lodash/fp'
import rawDefaultShipList from '../../assets/default-ship-list.json'

/*
   shipList will always use the same representation at runtime:

   {
     id: <master id>,
     ring: <boolean>, // married or not
     rosterId: <number>, // must be unique, and greater than 0
   }

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
  .map((x,ind) => ({
    ...x,
    // note that rosterId in game starts from 1
    // so we'd better make it consistent with the game
    rosterId: ind+1}))

// NOTE: shipList, as a reducer, should provide a default value when it's missing
// it's preloadedState that loads user settings and has it passed to this reducer.
const reducer = (state = defaultShipList, action) => {
  if (action.type === 'ShipList@modify') {
    const {modifier} = action
    return modifier(state)
  }
  if (action.type === 'ShipList@reset') {
    return defaultShipList
  }
  return state
}

const mapDispatchToProps = dispatch => ({
  modifyShipList: modifier => dispatch({
    type: 'ShipList@modify',
    modifier,
  }),
  resetShipList: () => dispatch({
    type: 'ShipList@reset',
  }),
})

export {
  reducer,
  mapDispatchToProps,
}
