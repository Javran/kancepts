import { enumFromTo } from '../utils'

// an Array from 1 to 40, to be used as expedition ids
const allExpedIdList = enumFromTo(1,40)

const resourceProperties = ['fuel', 'ammo', 'steel', 'bauxite']

export {
  allExpedIdList,
  resourceProperties,
}
