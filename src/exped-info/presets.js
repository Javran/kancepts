/*

   Some pre-defined set of expeditions

 */

import _ from 'lodash'

import {allExpedIdList} from './common'

// - recommended: exclude some non-beneficial expeditions
// - buckets: all expeditions that might yield buckets. (item2 included, without considering GS)
const recommendedBlacklist = [22,29,30,31,33,34]

const makePreset = (name, ids) => {
  const expedFlags = _.fromPairs(
    allExpedIdList.map(id =>
      [id, ids.includes(id)]))

  return {name, ids, expedFlags}
}

const presets = [
  makePreset(
    'All',
    allExpedIdList),
  makePreset(
    'Recommended',
    allExpedIdList.filter(id => !recommendedBlacklist.includes(id))),
  makePreset(
    'Buckets',
    [2,4,9,10,11,13,14,18,24,26,36,39,40]),
  makePreset(
    'None',
    []),
]

export {
  presets,
}
