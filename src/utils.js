import _ from 'lodash'

const pickSomeFrom = (() => {
  // nondeterministically pick one value from an array
  // and only keep those after the picked one.
  const pickOneFrom = xs => {
    if (xs.length === 0) {
      return []
    } else {
      return xs.map((x,ind) => ({
        picked: x,
        remained: xs.filter((_ignored,rInd) => ind < rInd),
      }))
    }
  }

  const pickSomeFromImpl = n => xs => {
    if (n === 0) {
      return [{pickedList: [], remained: xs}]
    }

    // all possible ways to pick one from 'xs'
    const alts = pickOneFrom(xs)
    return _.flatMap(alts, ({picked,remained}) => {
      const results = pickSomeFromImpl(n-1)(remained)
      return results.map(result => ({
        ...result,
        pickedList: [picked, ...result.pickedList],
      }))
    })
  }
  return pickSomeFromImpl
})()

const handleNoSubmit = e =>
  e.preventDefault()

/* eslint-disable indent */
const improvementToText = level =>
  level === 0 ? '★=0' :
  level === 10 ? '★+max' :
  `★+${level}`
/* eslint-enable indent */

const pprTime = (time, tr=null) => {
  const [hourShort,minShort] = typeof tr === 'function' ?
    ['HourShort', 'MinShort'].map(x => tr(x)) :
    ['hr', 'min']
  const hh = Math.floor(time / 60)
  const mm = time - hh*60
  return _.compact([
    hh > 0 ? `${hh} ${hourShort}` : null,
    mm > 0 ? `${mm} ${minShort}` : null,
  ]).join(' ')
}

export {
  pickSomeFrom,
  handleNoSubmit,
  improvementToText,
  pprTime,
}
