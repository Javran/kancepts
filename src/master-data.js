import _ from 'lodash'

import rawMasterData from './assets/api_start2.json'

const $ships = _.keyBy(rawMasterData.api_mst_ship, 'api_id')
const $shipTypes = _.keyBy(rawMasterData.api_mst_stype, 'api_id')
const $missions = _.keyBy(rawMasterData.api_mst_mission, 'api_id')
const $equips = _.keyBy(rawMasterData.api_mst_slotitem, 'api_id')

const dlcList = [
  68, // 大発動艇
  193, // 特大発動艇
  166, // 大発動艇(八九式中戦車&陸戦隊)
  167, // 特型内火艇
].map(id => {
  const $equip = $equips[id]
  return {
    id,
    name: $equip.api_name,
  }
})

export {
  $ships,
  $shipTypes,
  $missions,
  dlcList,

  rawMasterData,
}
