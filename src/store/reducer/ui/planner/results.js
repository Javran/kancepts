const reducer = (state = [], action) => {
  if (action.type === 'PlannerResults@modify') {
    const {modifier} = action
    return modifier(state)
  }
  return state
}

const mapDispatchToProps = dispatch => ({
  modifyResults: modifier => dispatch({
    type: 'PlannerResults@modify',
    modifier,
  }),
})

export {
  reducer,
  mapDispatchToProps,
}
