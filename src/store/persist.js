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
import { createSelector } from 'reselect'

import { shallowEqual } from '../utils'
import { defExpedConfig } from './reducer/exped-configs'

const persistPaths = [
  'expedConfigs',
  'shipList',
  'language',
  'ui.planner.config',
  'ui.currentTab',
  'ui.table.view',
  'ui.table.sort',
  'ui.dlcLab',
  'ui.costPicker',
  'ui.shipList',
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

const encodedPersistStateSelector = createSelector(
  persistStateSelector,
  pState => JSON.stringify({
    version: 1,
    state: pState,
  }))

const saveToLocalStorageImpl = state =>
  setTimeout(() => {
    const kanceptsData = {
      version: 1,
      state,
    }
    localStorage.kancepts = JSON.stringify(kanceptsData)
  })

const clearPersistData = () => {
  delete localStorage.kancepts
}

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

const latestVersion = '0.1.2'

const updatePersistState = kanceptsData => {
  if (!kanceptsData || typeof kanceptsData !== 'object')
    return {}

  if (kanceptsData.version === latestVersion) {
    return kanceptsData
  }

  let curKData = kanceptsData

  // start updating logic
  if (curKData.version === 1) {
    // first version => '0.1.2'
    const {state: {expedConfigs}} = curKData
    const newExpedConfigs = {...expedConfigs};
    // basically fill in default info about A1 A2 A3
    [100,101,102].map(eId => {
      newExpedConfigs[eId] = defExpedConfig
    })

    // TODO: do we select them in planner by default?

    curKData = {
      state: {
        ...curKData.state,
        expedConfigs: newExpedConfigs,
      },
      version: '0.1.2',
    }
  }

  if (curKData.version === latestVersion) {
    // TODO save
    return curKData
  }
  console.error(`failed to update data file, the config is at version ${curKData.version}`)
  return {}
}

const loadPreparedState = () => {
  try {
    const raw = localStorage.kancepts
    // localStorage is empty, nothing to load.
    if (typeof raw === 'undefined')
      return {}

    const kanceptsData = updatePersistState(JSON.parse(raw))
    return normalizePersistState(kanceptsData.state)
  } catch (e) {
    console.error('error while loading preparedState from localStorage', e)
    return {}
  }
}

export {
  persistStateObserver,
  loadPreparedState,
  clearPersistData,
  encodedPersistStateSelector,
  normalizePersistState,
}
