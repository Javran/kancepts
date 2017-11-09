import _ from 'lodash'
import { $missions } from '../master-data'

/*
   all expedition ids, excluding those event expeditions
 */
const allExpedIdList =
  Object.keys($missions).map(Number).sort((x,y) => x-y).filter(x => x < 300)

const resourceProperties = ['fuel', 'ammo', 'steel', 'bauxite']

const emptyResource = _.fromPairs(
  resourceProperties.map(rp => [rp,0]))

const liftBinaryToResource = binFunc => (resource1, resource2) =>
  _.fromPairs(
    resourceProperties.map(rp =>
      [rp, binFunc(resource1[rp],resource2[rp])]))

export {
  allExpedIdList,
  resourceProperties,
  emptyResource,
  liftBinaryToResource,
}
