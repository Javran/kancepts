import { enumFromTo } from './utils'

import expedInfoListRaw from './assets/exped-info.json'

// an Array from 1 to 40, to be used as expedition ids
const allExpedIdList = enumFromTo(1,40)

const resourceProperties = ['fuel', 'ammo', 'steel', 'bauxite']

const itemIdToName = x =>
    x === 0 ? null
  : x === 1 ? 'bucket'
  : x === 2 ? 'instant-build'
  : x === 3 ? 'dev-mat'
  : x === 10 ? 'coin-small'
  : x === 11 ? 'coin-medium'
  : x === 12 ? 'coin-large'
  : console.error(`unknown item id: ${x}`)

const expedInfoList = expedInfoListRaw.map(raw => {
  const id = raw.api_id
  const name = raw.api_name
  const time = raw.api_time
  const [fuel,ammo,steel,bauxite] = raw.resource
  const fromRawItem = ([itmId, itmCnt]) =>
    ({name: itemIdToName(itmId), count: itmCnt})

  const itemProb = fromRawItem(raw.api_win_item1)
  const itemGS = fromRawItem(raw.api_win_item2)
  return {
    id, name, time,
    resource: {fuel, ammo, steel, bauxite},
    // itemProb: item obtainable randomly from expedition
    // itemGS: guaranteed item if great success is achieved
    itemProb, itemGS,
  }
})

export {
  allExpedIdList,
  expedInfoList,
  resourceProperties,
}
