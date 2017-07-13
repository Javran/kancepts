import _ from 'lodash'
// merge obj2 to obj1,
// for any type inconsistency obj1 wins.

const mergeObject = (obj1, obj2) => {
  if (obj1 === obj2)
    return obj1

  // given obj1 and obj2 are not equal
  // if either of them is null, stop merging
  if (obj1 === null || obj2 === null)
    return obj1

  if (typeof obj1 !== typeof obj2)
    return obj1

  if (typeof obj1 !== 'object')
    return obj2

  // if both are arrays, obj2 replaces obj1
  if (Array.isArray(obj1) && Array.isArray(obj2))
    return obj2

  // type mismatched, aborting
  if ((Array.isArray(obj1) && !Array.isArray(obj2)) ||
      (!Array.isArray(obj1) && Array.isArray(obj2)))
    return obj1

  const keys = _.uniq([...Object.keys(obj1), ...Object.keys(obj2)])
  const resultObj = {}
  // eslint-disable-next-line array-callback-return
  keys.map(k => {
    const v1 = obj1[k]
    const v2 = obj2[k]
    if (typeof v1 !== 'undefined' && typeof v2 !== 'undefined') {
      resultObj[k] = mergeObject(v1,v2)
    } else {
      if (typeof v1 !== 'undefined') {
        resultObj[k] = v1
      } else if (typeof v2 !== 'undefined') {
        resultObj[k] = v2
      }
    }
  })
  return resultObj
}

export { mergeObject }
