/*

   Some pre-defined set of expeditions

 */

import {allExpedIdList} from './common'


// - recommended: exclude some non-beneficial expeditions
// - buckets: all expeditions that might yield buckets. (item2 included, without considering GS)
const recommendedBlacklist = [22,29,30,31,33,34]

const presets = [
  {
    name: 'All',
    ids: allExpedIdList,
  },
  {
    name: 'Recommended',
    ids: allExpedIdList.filter(id => !recommendedBlacklist.includes(id)),
  },
  {
    name: 'Buckets',
    ids: [2,4,9,10,11,13,14,18,24,26,36,39,40],
  },
  {
    name: 'None',
    ids: [],
  },
]

export {
  presets,
}
