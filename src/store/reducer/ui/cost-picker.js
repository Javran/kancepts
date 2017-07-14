const initState = {
  fuelPercent: 100,
  ammoPercent: 100,
}

const reducer = (state = initState, action) => {
  if (action.type === 'CostPicker@modify') {
    const {modifier} = action
    return modifier(state)
  }

  return state
}

const mapDispatchToProps = dispatch => ({
  modifyCostPicker: modifier => dispatch({
    type: 'CostPicker@modify',
    modifier,
  }),
})

export {
  reducer,
  mapDispatchToProps,
}
