const initState = {
  view: {
    divide: 'total', // total / hourly
    income: 'net', // gross / net / basic
    numeric: false, // bool
  },
  sort: {
    method: 'id', // id / time / fuel / ammo / steel / bauxite
    reversed: false, // bool
  },
}

const reducer = (state = initState, action) => {
  if (action.type === 'TableUI@modify') {
    const {modifier} = action
    return modifier(state)
  }

  return state
}

const mapDispatchToProps = dispatch => ({
  modifyTableUI: modifier => dispatch({
    type: 'TableUI@modify',
    modifier,
  }),
})

export {
  reducer,
  mapDispatchToProps,
}
