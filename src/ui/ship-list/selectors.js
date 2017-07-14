import { createSelector } from 'reselect'
import {
  shipListUISelector,
  shipListSelector,
} from '../../selectors'

const searchAndAddUISelector = createSelector(
  shipListUISelector,
  shipListSelector,
  ({searchAndAdd}, shipList) => {
    const {masterId} = searchAndAdd
    const count = shipList.filter(s => s.id === masterId).length
    return {...searchAndAdd, count}
  })

export {
  searchAndAddUISelector,
}
