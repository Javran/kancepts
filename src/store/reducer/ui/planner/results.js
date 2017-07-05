const reducer = (state = [], action) => {
  if (action.type === 'Planner@modifyResults') {
    const {modifier} = action
    return modifier(state)
  }
  return state
}

const mapDispatchToProps = dispatch => ({
  modifyResults: modifier => dispatch({
    type: 'Planner@modifyResults',
    modifier,
  }),
})

export {
  reducer,
  mapDispatchToProps,
}
