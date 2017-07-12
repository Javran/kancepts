import _ from 'lodash'
import { createSelector } from 'reselect'

import {
  expedInfoList,
} from '../../../exped-info'
import {
  expedConfigsSelector,
  expedIncomesSelector,
} from '../../../selectors'

const expedDetailSelector = _.memoize(
  id => createSelector(
    expedConfigsSelector,
    expedIncomesSelector,
    (expedConfigs, expedIncomes) => {
      const info = expedInfoList.find(ei => ei.id === id)
      const config = expedConfigs[id]
      const expedIncome = expedIncomes[id]
      return {
        info,
        config,
        expedIncome,
      }
    }))

export { expedDetailSelector }
