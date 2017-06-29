// enumFromTo(x,y) = [x,x+1,x+2...y]
// only guarantee to work on increasing sequences
const enumFromTo = (frm,to,succ=(x => x+1)) => {
  const arr = []
  for (let i=frm; i<=to; i=succ(i))
    arr.push( i )
  return arr
}

function warn(...args) {
  return console.warn.apply(this, args)
}

function error(...args) {
  return console.error.apply(this, args)
}


// usage: "ignore(a,b,c)" to fool eslint to believe that "a", "b" and "c"
// are somehow being used, it serves as an explicit annotation to say that they actually don't
const ignore = () => undefined

const identity = x => x

const not = x => !x

// "modifyArray(index,f)(xs)" keeps "xs" intact and returns a new array
// whose element on "index" is modified by feeding original value to "f".
// if "index" is out of range, "xs" itself is returned.
const modifyArray = (index, f) => {
  if (typeof index !== 'number')
    console.error('index is not a number')
  if (typeof f !== 'function')
    console.error('modifier is not a function')
  return xs => {
    if (index < 0 || index >= xs.length)
      return xs
    const ys = [...xs]
    const v = ys[index]
    ys[index] = f(v)
    return ys
  }
}

const mkErrorRecorder = () => {
  const errMsgLog = []
  return {
    recordError: msg => errMsgLog.push(msg),
    get: () => errMsgLog,
  }
}

const saturate = (min,max) => v =>
  v < min ? min : (v > max ? max : v)

const shallowObjectEqual = (obj1,obj2) => {
  if (obj1 === obj2)
    return true

  // know: obj1 & obj2 are not strictly equal
  if (typeof obj1 !== typeof obj2 ||
      // NOTE: `typeof null`  returns 'object',
      // we need this extra check to prevent dealing with nulls
      // in following parts.
      // since we've know obj1 !== obj2, having either object being
      // `null` means they are definitely different.
      (obj1 === null || obj2 === null) ||
      /*
         know: obj1 and obj2 are of the same type
       */
      typeof obj1 !== 'object')
    return false

  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)
  if (keys1.length !== keys2.length)
    return false
  return keys1.every(key => {
    const val1 = obj1[key]
    const val2 = obj2[key]
    return val1 === val2
  })
}

const precompose = prj => f => (...args) =>
  f(...args.map(prj))

const mergeResults = (...funcs) => (...args) =>
  funcs.map(f => f.call(null,...args)).reduce((acc,x) => ({
    ...acc, ...x}), {})

export {
  enumFromTo,
  ignore,
  identity,
  not,

  warn,
  error,

  modifyArray,
  mkErrorRecorder,

  saturate,

  shallowObjectEqual,
  precompose,
  mergeResults,
}
