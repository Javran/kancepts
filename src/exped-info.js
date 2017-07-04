import _ from 'lodash'
import { enumFromTo } from './utils'

import { $missions } from './master-data'
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
  const $mission = $missions[id]
  const name = $mission.api_name
  const time = $mission.api_time
  const [fuel,ammo,steel,bauxite] = raw.resource
  const fromRawItem = ([itmId, itmCnt]) =>
    ({name: itemIdToName(itmId), maxCount: itmCnt})

  const itemProb = fromRawItem($mission.api_win_item1)
  const itemGS = fromRawItem($mission.api_win_item2)
  const fuelPercent = Math.round($mission.api_use_fuel * 100)
  const ammoPercent = Math.round($mission.api_use_null * 100)
  return {
    id, name, time,
    resource: {fuel, ammo, steel, bauxite},
    // itemProb: item obtainable randomly from expedition
    // itemGS: guaranteed item if great success is achieved
    itemProb, itemGS,
    cost: {fuelPercent, ammoPercent},
  }
})

export {
  allExpedIdList,
  expedInfoList,
  resourceProperties,
}
