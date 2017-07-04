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

const reducer = (state = genDefExpedConfigs(), action) => {
  if (action.type === 'ExpedConfigList@modifyExpedConfig') {
    const {expedId, modifier} = action
    return {
      ...state,
      [expedId]: modifier(state[expedId]),
    }
  }
  return state
}

const mapDispatchToProps = dispatch => ({
  modifyExpedConfig: (expedId, modifier) => dispatch({
    type: 'ExpedConfigList@modifyExpedConfig',
    expedId, modifier,
  }),
})

export {
  reducer,
  mapDispatchToProps,
}
