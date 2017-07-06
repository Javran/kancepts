/* eslint-disable no-console */
const {readdirSync} = require('fs')
const _ = require('lodash')

const l = console.log

const re = /^(.+)\.png$/
const icons = _.compact(
  readdirSync('../assets/icons').map(fName => re.exec(fName))
).map(x => {
  const name = x[1]
  const identName = `${_.camelCase(name)}Img`
  const filePath = `../assets/icons/${name}.png`
  return {
    name,
    identName,
    filePath,
  }
})

l(`// This file is generated using misc/gen-item-icon-import.js`)
icons.map(({identName, filePath}) =>
  l(`import ${identName} from '${filePath}'`))
l()
l(`const imgMap = new Map([`)
icons.map(({name, identName}) =>
  l(`  ['${name}', ${identName}],`))
l('])')
l()
l(`export {imgMap}`)
