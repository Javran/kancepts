import _ from 'lodash'
import { $missions } from '../master-data'

/*
   all expedition ids, excluding those event expeditions
 */
const allExpedIdList =
  Object.keys($missions).map(Number).sort((x,y) => x-y).filter(x => x < 300)

// Array of [worldId, Array of raw mission], sorted.
// TODO: replace some uses of allExpedIdList by grouppedExpedIds
const grouppedExpedIds =
  _.sortBy(
    _.toPairs(
      _.groupBy(
        _.values($missions).filter(x => x.api_maparea_id < 30),
        'api_maparea_id'
      )
    ).map(([k,ms]) =>
      [Number(k), _.sortBy(ms, 'api_id')]
    ),
    ([k,_v]) => k
  )

const resourceProperties = ['fuel', 'ammo', 'steel', 'bauxite']

const emptyResource = _.fromPairs(
  resourceProperties.map(rp => [rp,0]))

const liftBinaryToResource = binFunc => (resource1, resource2) =>
  _.fromPairs(
    resourceProperties.map(rp =>
      [rp, binFunc(resource1[rp],resource2[rp])]))

export {
  allExpedIdList,
  grouppedExpedIds,
  resourceProperties,
  emptyResource,
  liftBinaryToResource,
}
