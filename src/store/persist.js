/*

   mechanism for persisting (some parts of) the store:

   - `localStorage.kancepts` is used for storing everything in encoded JSON format.
     this way we don't need to worry (too much) about the same hosting site
     being used for other purposes so localStorage might be shared.

   - `localStorage.kancepts.version` is a number for data version

   - `persistPaths` in this module keeps a list of paths of the store needed to be
     saved, we use a selector to extract these paths using `_.get` and
     paths with non-`undefined` values are merged into a single Object using `_.set`,
     which is then saved as `localStorage.kancepts.state`.

   - `localStorage.kancepts.state` is used as preloadedState when initializing the store.

   - debounce saving action as we don't really need to save that often.
     (500ms should be fine I guess)

 */
import _ from 'lodash'
import { observer } from 'redux-observers'

import { shallowEqual } from '../utils'

const persistPaths = [
  'expedConfigs',
  'ui.planner.config',
]

// get non-undefined path values and merge them into another Object
const persistStateSelector = state => persistPaths
  .reduce(
    (curObj,path) => {
      const pathVal = _.get(state,path)
      if (typeof pathVal !== 'undefined') {
        _.set(curObj,path,pathVal)
      }
      return curObj
    },
    {})

const saveToLocalStorageImpl = state =>
  setTimeout(() => {
    const kanceptsData = {
      version: 1,
      state,
    }
    localStorage.kancepts = JSON.stringify(kanceptsData)
  })

const saveToLocalStorage = _.debounce(
  saveToLocalStorageImpl,
  500
)

const persistStateObserver = observer(
  persistStateSelector,
  (_dispatch, current, previous) => {
    if (!shallowEqual(current, previous)) {
      saveToLocalStorage(current)
    }
  })

// note that if we feed a persist state to persistStateSelector,
// it should produce another Object with exactly the same shape,
// we can use this property to "normalize" a persist state so it only contains
// those specified paths
const normalizePersistState = persistStateSelector

const loadPreparedState = () => {
  try {
    const raw = localStorage.kancepts
    // localStorage is empty, nothing to load.
    if (typeof raw === 'undefined')
      return {}

    const kanceptsData = JSON.parse(raw)
    if (kanceptsData.version !== 1)
      throw new Error(
        `version mismatched: expecting 1 `+
        `while getting ${kanceptsData.version}`)

    return normalizePersistState(kanceptsData.state)
  } catch (e) {
    console.error('error while loading preparedState from localStorage', e)
    return {}
  }
}

export {
  persistStateObserver,
  loadPreparedState,
}
