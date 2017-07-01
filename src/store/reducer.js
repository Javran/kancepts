import defaultShipList from '../assets/default-ship-list.json'

const loadShipList = () => {
  const raw = localStorage.shipList
  if (typeof raw === 'undefined') {
    return defaultShipList
  } else {
    try {
      return JSON.parse(raw)
    } catch (e) {
      console.error(`Error while loading ship list: `, e)
      return defaultShipList
    }
  }
}

const reducer = (state = loadShipList(), _action) => {
  return state
}

export {
  reducer,
}
