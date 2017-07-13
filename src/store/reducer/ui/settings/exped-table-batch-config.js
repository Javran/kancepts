const initState = {
  filter: {
    expedTime: {
      enabled: true,
      value: 60,
    },
    resourceSum: {
      enabled: true,
      value: 400,
    },
    connective: {
      // 'enabled' state of this one is derived
      // from the other two
      // which is available through selector
      value: 'and',
    },
  },
  selected: [],
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
