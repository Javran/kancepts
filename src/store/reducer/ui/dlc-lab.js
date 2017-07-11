/*

   representation:

   {
     kinuK2: <bool>,
     gsPercent: integer 0~100,
     equipments: {<masterId>: {<level>: <count>}},
   }

 */

const initState = {
  kinuK2: false,
  gsPercent: 0,
  equipments: {},
  rawIncome: 200,
}

const reducer = (state = initState, action) => {
  if (action.type === 'DlcLab@modify') {
    const {modifier} = action
    return modifier(state)
  }
  return state
}

const mapDispatchToProps = dispatch => ({
  modifyDlcLabUI: modifier => dispatch({
    type: 'DlcLab@modify',
    modifier,
  }),
})

export {
  reducer,
  mapDispatchToProps,
}
