import { PropTypes } from 'prop-types'

const allRequired = shapeObj => {
  const ret = {}
  // eslint-disable-next-line array-callback-return
  Object.keys(shapeObj).map(k => {
    const original = shapeObj[k]
    ret[k] = typeof original.isRequired !== 'undefined'
      ? original.isRequired
      : PropTypes.oneOfType([original]).isRequired
  })
  return ret
}

const PTyp = {
  ...PropTypes,
  allRequired,
}

export { PTyp }
