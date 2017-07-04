import _ from 'lodash'

import { allExpedIdList } from '../../exped-info'

const defExpedConfig = {
  modifier: {
    type: 'standard',
    gs: false,
    daihatsu: 0,
  },
  cost: {
    type: 'cost-model',
    wildcard: false,
  },
}

const genDefExpedConfigs = () =>
  _.fromPairs(
    allExpedIdList.map(expedId =>
      [expedId, defExpedConfig]))

const expedConfigs = (state = genDefExpedConfigs(), _action) => {
  return state
}

export { expedConfigs }
