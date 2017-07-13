import {
  allExpedIdList,
} from '../../../../exped-info'

const initState = {
  filter: {
    expedTime: {
      enabled: false,
      value: 60,
    },
    resourceSum: {
      enabled: false,
      value: 500,
    },
    connective: {
      // 'enabled' state of this one is derived
      // from the other two
      // which is available through selector
      value: 'and',
    },
  },
  selected: allExpedIdList,
  options: {
    dlcCount: 4,
    shipCount: 6,
  },
}

const reducer = (state = initState, action) => {
  if (action.type === 'SettingsExpedTableBatchConfig@modify') {
    const {modifier} = action
    return modifier(state)
  }
  return state
}

const mapDispatchToProps = dispatch => ({
  modifyBatchConfig: modifier => dispatch({
    type: 'SettingsExpedTableBatchConfig@modify',
    modifier,
  }),
})

export { reducer, mapDispatchToProps }
