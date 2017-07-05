import _ from 'lodash'
import { pickSomeFrom } from './utils'
import { plannerConfigSelector } from './selectors'
import {
  allExpedIdList,
  resourceProperties,
} from './exped-info'

const computePlannerResultsImpl = (state, postResults) =>
  setTimeout(() => {
    const plannerConfig = plannerConfigSelector(state)
    const {
      expedFlags,
      priority,
      fleetCount,
      afkTime,
    } = plannerConfig
    const selectedExpedIds = allExpedIdList.filter(expedId =>
      expedFlags[expedId])
    const expedSets = pickSomeFrom(fleetCount)(selectedExpedIds)
      .map(x => x.pickedList)

    // TODO
    postResults(expedSets.map(expedIds => ({
      expedIds,
      resource: _.fromPairs(
        resourceProperties.map(rp =>
          [rp, _.random(1000,2000)/10])),
      score: _.random(1000,5000),
    })))
  })

const computePlannerResults = _.debounce(
  computePlannerResultsImpl,
  500
)

export {
  computePlannerResults,
}
