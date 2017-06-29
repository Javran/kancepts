/*

   This script generates a default ship list from 'api_start2.json'

   This is done by:

   - first group ships by ship type.
   - then for each group of ships, presevre only the last remodel of the same ship.

   The resulting list is by no means always possible for everyone
   (for example, Taigei and Ryuuhouu will both appear in the list),
   but should be good enough as the default ship list.

 */

/* eslint-disable no-console */

const { readJsonSync, writeJsonSync } = require('fs-extra')
const { _ } = require('lodash')

const masterData = readJsonSync('api_start2.json')

const $ships = _.fromPairs(masterData.api_mst_ship.map(x => [x.api_id, x]))
const $shipTypes = _.fromPairs(masterData.api_mst_stype.map(x => [x.api_id,x]))

const mstIds = Object.keys($ships).map(Number).filter(k => k < 1501)
const afterMstIdSet = new Set()

mstIds.map(mstId => {
  const $ship = $ships[mstId]
  const afterMstId = Number($ship.api_aftershipid)
  if (afterMstId !== 0)
    afterMstIdSet.add(afterMstId)
})

const originMstIds = mstIds.filter(mstId => !afterMstIdSet.has(mstId))

/*
   remodelChains[originMstId] = <RemodelChain>

   - originMstId: master id of the original ship
   - RemodelChain: an Array of master ids, sorted by remodeling order.
 */
const remodelChains = _.fromPairs(originMstIds.map(originMstId => {
  const searchRemodels = (mstId, results=[]) => {
    if (results.includes(mstId))
      return results

    const newResults = [...results, mstId]
    const $ship = $ships[mstId]
    const afterMstId = Number($ship.api_aftershipid)
    if (afterMstId !== 0) {
      return searchRemodels(afterMstId,newResults)
    } else {
      return newResults
    }
  }
  return [originMstId, searchRemodels(originMstId)]
}))

// originMstIdOf[<master id>] = <original master id>
const originMstIdOf = {}
Object.entries(remodelChains).map(([originMstId, remodelChain]) => {
  remodelChain.map(mstId => {
    originMstIdOf[mstId] = originMstId
  })
})

// list of master id groupped by stype
const stypeGroupedMstIds = {}

mstIds.map(mstId => {
  const stype = $ships[mstId].api_stype
  const xs = stypeGroupedMstIds[stype] || []
  stypeGroupedMstIds[stype] = [...xs,mstId]
})

// preserve only final remodels for each ship type group
const stypeGroupedMstIdsFinal = _.fromPairs(
  Object.entries(stypeGroupedMstIds).map(([stype,sMstIds]) => {
    const grouppedByOrigin = {}
    sMstIds.map(mstId => {
      const originMstId = originMstIdOf[mstId]
      const xs = grouppedByOrigin[originMstId] || []
      grouppedByOrigin[originMstId] = [...xs, mstId]
    })

    // only preserve one for each group
    // (as every group shares the same original master id
    const results = Object.entries(grouppedByOrigin).map(([originMstId,sameOriginMstIds]) => {
      const remodelChain = remodelChains[originMstId]
      // reordered
      const xs = remodelChain.filter(mstId => sameOriginMstIds.includes(mstId))
      return _.last(xs)
    })

    return [stype, results]
  }))

const shipList =
  _.concat(...Object.values(stypeGroupedMstIdsFinal))
    .map(id => ({id, m: false}))

writeJsonSync('default-ship-list.json', shipList)
