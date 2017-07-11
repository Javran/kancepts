const reducer = (state = [], action) => {
  if (action.type === 'Planner@modify') {
    const {modifier} = action
    return modifier(state)
  }
  return state
}

const mapDispatchToProps = dispatch => ({
  modifyResults: modifier => dispatch({
    type: 'Planner@modify',
    modifier,
  }),
})

export {
  reducer,
  mapDispatchToProps,
}
