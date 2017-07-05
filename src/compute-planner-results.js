import _ from 'lodash'
import { pickSomeFrom } from './utils'
import {
  plannerConfigSelector,
  expedIncomesSelector,
} from './selectors'
import {
  allExpedIdList,
  resourceProperties,
  emptyResource,
  liftBinaryToResource,
  plusResource,
  expedInfoList,
  onResourceValue,
} from './exped-info'

const isValidResourceObject = x =>
  x !== null &&
  typeof x === 'object' &&
  resourceProperties.every(rp =>
    _.isFinite(x[rp]))

const computePlannerResultsImpl = (state, postResults) =>
  setTimeout(() => {
    const plannerConfig = plannerConfigSelector(state)
    const {
      expedFlags,
      priority,
      fleetCount,
      afkTime,
    } = plannerConfig

    /*
       transform incomes into netIncomes
       which guarantees to only hold valid resource objects.
       if for some reason (perhaps fleet composition requirement
       cannot be met given current ship list) the net income
       has 'null' or any other invalid fields in it,
       the expedition in question will not have an entity
       in netIncomes object.
     */
    const netIncomes = _.fromPairs(
      _.flatMap(
        _.toPairs(expedIncomesSelector(state)),
        pair => {
          const pure = x => [x]
          const [expedId, income] = pair
          const {net} = income
          return isValidResourceObject(net) ? pure([expedId,net]) : []
        }))
    const selectedExpedIds = allExpedIdList.filter(expedId =>
      // first need to be user-selected expedition
      expedFlags[expedId] &&
      // then we should be able to compute the net income
      typeof netIncomes[expedId] !== 'undefined'
    )
    // preprocess hourly income for all expeditions
    // that are both selected and valid
    const hourlyIncomes = _.fromPairs(
      _.flatMap(
        _.toPairs(netIncomes),
        pair => {
          const pure = x => [x]
          const [idStr,netIncome] = pair
          const id = parseInt(idStr,10)
          if (! selectedExpedIds.includes(id))
            return []
          const info = expedInfoList.find(ei => ei.id === id)
          // in minutes, take whichever longer
          const time = Math.max(info.time,afkTime)
          const hourly = onResourceValue(v => v*60/time)(netIncome)
          return pure([idStr, hourly])
        }))

    // generate search space
    const expedsList = pickSomeFrom(fleetCount)(selectedExpedIds)
      .map(x => x.pickedList)

    const mulResource = liftBinaryToResource((x,y) => x*y)
    const computeScore = resource => {
      const weighted = mulResource(resource,priority)
      return _.sum(resourceProperties.map(rp => weighted[rp]))
    }

    const results = expedsList
      .map(expedIds => {
        const resource =
          expedIds.reduce(
            (curResource,expedId) =>
              plusResource(curResource,hourlyIncomes[expedId]),
            emptyResource)
        const score = computeScore(resource)
        return {
          expedIds,
          resource,
          score,
        }
      })
      .sort((x,y) => y.score - x.score)

    postResults(results)
  })

const computePlannerResults = _.debounce(
  computePlannerResultsImpl,
  500
)

export {
  computePlannerResults,
}
