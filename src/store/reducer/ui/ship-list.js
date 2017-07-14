const initState = {
  searchAndAdd: {
    stype: 20,
    masterId: 184,
    ring: false,
  },
}

const reducer = (state = initState, action) => {
  if (action.type === 'ShipListUI@modify') {
    const {modifier} = action
    return modifier(state)
  }
  return state
}

const mapDispatchToProps = dispatch => ({
  modifyShipListUI: modifier => dispatch({
    type: 'ShipListUI@modify',
    modifier,
  }),
})

export {
  reducer,
  mapDispatchToProps,
}
