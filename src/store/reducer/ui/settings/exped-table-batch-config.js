import { expedInfoList } from '../../../../exped-info'

const prepareFilterFunc = ({expedTime, resourceSum, connective}) => {
  const expedTimeFunc = expedTime.enabled ?
    (ei => ei.time >= expedTime.value) :
    () => true
  const resourceSumFunc = resourceSum.enabled ?
    (ei => ei.resourceSum >= resourceSum.value) :
    () => true
  const connectiveEnabled = expedTime.enabled && resourceSum.enabled
  if (connectiveEnabled) {
    const binary =
      connective.value === 'and' ? ((x,y) => x && y) :
      connective.value === 'or' ? ((x,y) => x || y) :
      console.error(`Invalid connective: ${connective.value}`)
    return ei => binary(expedTimeFunc(ei), resourceSumFunc(ei))
  } else {
    return ei => expedTimeFunc(ei) && resourceSumFunc(ei)
  }
}

const preInitState = {
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

const initState = {
  ...preInitState,
  selected: expedInfoList.filter(
    prepareFilterFunc(preInitState.filter)
  ).map(ei => ei.id),
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

export {
  reducer,
  mapDispatchToProps,
  prepareFilterFunc,
}
