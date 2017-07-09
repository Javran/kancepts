const reducer = (state = 'planner', action) => {
  if (action.type === 'CurrentTab@switchTab') {
    const {tab} = action
    return tab
  }
  return state
}

const mapDispatchToProps = dispatch => ({
  switchTab: tab => dispatch({
    type: 'CurrentTab@switchTab',
    tab,
  }),
})

export {
  reducer,
  mapDispatchToProps,
}
