import _ from 'lodash'
import { enumFromTo } from '../utils'

// an Array from 1 to 40, to be used as expedition ids (TODO: comment)
const allExpedIdList =
  [...enumFromTo(1,40), 100, 101, 102, 110]

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
