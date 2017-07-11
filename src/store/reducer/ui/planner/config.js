import _ from 'lodash'
import {
  allExpedIdList,
  resourceProperties,
} from '../../../../exped-info'

const initState = {
  expedFlags: _.fromPairs(
    allExpedIdList.map(expedId => [expedId, true])),
  weight: _.fromPairs(
    resourceProperties.map(rp => [rp, 20])),
  fleetCount: 3,
  afkTime: 0,
}

const reducer = (state = initState, action) => {
  if (action.type === 'PlannerConfig@modify') {
    const {modifier} = action
    return modifier(state)
  }
  return state
}

const mapDispatchToProps = dispatch => ({
  modifyPlanner: modifier => dispatch({
    type: 'PlannerConfig@modify',
    modifier,
  }),
})

export {
  reducer,
  mapDispatchToProps,
}
