/*
   This script tries to normalize the response of

   `<server>/kcsapi/api_start2` and store the result for further processing.

   The "normalization" traverses the structure,
   for every object, it "sorts" its keys.

   Despite that JSON Objects are intentionally unordered, we can still
   normalize it by re-inserting every pair in sorted order - as we assume
   there is no non-deterministic factor involved in object property insertion,
   we will always get the object whose `JSON.stringify` is always the same.

 */

/* eslint-disable no-console */
const { readJsonSync, writeJsonSync } = require('fs-extra')
const { _ } = require('lodash')

const args = process.argv.slice(2)

if (args.length !== 2)
  throw new Error('Expecting two arguments: <input file> <output file>')

const [fpIn, fpOut] = args

console.log(`Input: ${fpIn}`)
console.log(`Output: ${fpOut}`)

const normalizeData = v => {
  if (v === null)
    return null

  if (typeof v === 'object') {
    if (Array.isArray(v)) {
      return v.map(normalizeData)
    } else {
      const keys = Object.keys(v).sort()
      return _.fromPairs(keys.map(k => [k, normalizeData(v[k])]))
    }
  } else {
    return v
  }
}

const masterData = (() => {
  const notFound = () => {
    throw new Error('content not found')
  }
  const harData = readJsonSync(fpIn)
  const rawEntries = _.get(harData,'log.entries')
  if (! rawEntries)
    notFound()

  const entry = _.last(
    rawEntries.filter(e =>
      _.get(e,'request.url').indexOf('api_start2') !== -1))

  if (! entry)
    notFound()
  const record = _.get(entry,'response.content.text')
  if (typeof record !== 'string' || ! record.startsWith('svdata='))
    notFound()

  const parsed = JSON.parse(record.slice('svdata='.length))
  return normalizeData(parsed.api_data)
})()

writeJsonSync(fpOut,masterData)
