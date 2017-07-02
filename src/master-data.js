import _ from 'lodash'

import rawMasterData from './assets/api_start2.json'

const $ships = _.keyBy(rawMasterData.api_mst_ship, 'api_id')
const $shipTypes = _.keyBy(rawMasterData.api_mst_stype, 'api_id')

export {
  $ships,
  $shipTypes,
}
