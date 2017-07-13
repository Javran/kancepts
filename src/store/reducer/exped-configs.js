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
    wildcard: 'dd',
    count: 0,
  },
}

const genDefExpedConfigs = () =>
  _.fromPairs(
    allExpedIdList.map(expedId =>
      [expedId, defExpedConfig]))

const reducer = (state = genDefExpedConfigs(), action) => {
  if (action.type === 'ExpedConfigList@modify') {
    const {expedId, modifier} = action
    return {
      ...state,
      [expedId]: modifier(state[expedId]),
    }
  }

  if (action.type === 'ExpedConfigList@reset') {
    return genDefExpedConfigs()
  }
  return state
}

const mapDispatchToProps = dispatch => ({
  modifyExpedConfig: (expedId, modifier) => dispatch({
    type: 'ExpedConfigList@modify',
    expedId, modifier,
  }),
  resetExpedConfigs: () => dispatch({
    type: 'ExpedConfigList@reset',
  }),
})

export {
  reducer,
  mapDispatchToProps,
}
