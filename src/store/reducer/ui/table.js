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
  if (action.type === 'TableUI@modifyTableUI') {
    const {modifier} = action
    return modifier(state)
  }

  return state
}

const mapDispatchToProps = dispatch => ({
  modifyTableUI: modifier => dispatch({
    type: 'TableUI@modifyTableUI',
    modifier,
  }),
})

export {
  reducer,
  mapDispatchToProps,
}
