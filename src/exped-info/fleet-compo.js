/*

   - provide utilities related to fleet compositions

   - encode minimal fleet composition for running expeditions

     Note: the encoded fleet compositions only guarantee to
     satisfy ship count and ship type requirements.

 */

import _ from 'lodash'

import { isValidFilterId } from '../ship-filters'

const minimalFleetCompos = {}

/*
   should be clear enough of what this function does by examples:

   - mkFleetCompo(2, 'dd') => {dd: 2}
   - mkFleetCompo(2,'cv-like',1,'ca',1,'dd') => {'cv-like': 2, 'ca': 1, 'dd': 1}
   - mkFleetCompo(2, 'dd', 3, 'dd') => {dd: 5}

   as already demonstratated by the last example,
   the function deals with duplicated inputs properly.

 */
const mkFleetCompo = (...args) => {
  if (args.length % 2 !== 0) {
    return console.error('expecting even number of arguments')
  }
  const pairs = _.chunk(args,2)
  const valid =
    ([countRaw, stypeRaw]) => _.isInteger(countRaw) && isValidFilterId(stypeRaw)
  if (pairs.every(valid)) {
    // verification done
    return pairs.reduce(
      (curFleetCompo, pair) => {
        const [count,stype] = pair
        const curCount =
          typeof curFleetCompo[stype] === 'undefined' ?
            0 :
            curFleetCompo[stype]

        return {
          ...curFleetCompo,
          [stype]: curCount + count,
        }
      },
      {})
  } else {
    console.error(`unexpected value found in arguments`)
    const pair = pairs.find(x => !valid(x))
    console.error(`the problematic pair is ${pair}`)
  }
}

// make sure a fleet composition has at least some number of ships
// will use 'any' types as placeholders
const atLeast = n => fleetCompo => {
  const curCount = _.sum(Object.values(fleetCompo))
  if (curCount >= n) {
    return fleetCompo
  } else {
    const curAnyCount =
      typeof fleetCompo.any === 'undefined' ?
        0 :
        fleetCompo.any
    return {
      ...fleetCompo,
      any: curAnyCount + n - curCount,
    }
  }
}

const full = atLeast(6)

/*
   to apply a wildcard type on a fleet composition
   means to replace 'any' with a specified concrete wildcard type.
 */
const applyWildcard = stypeWildcard => fleetCompo => {
  if (typeof fleetCompo.any === 'undefined')
    return fleetCompo
  const countAny = fleetCompo.any
  const {any: _ignored, ...newFleetCompo} = fleetCompo

  const count =
    typeof fleetCompo[stypeWildcard] === 'undefined' ?
      0 :
      fleetCompo[stypeWildcard]
  return {
    ...newFleetCompo,
    [stypeWildcard]: count + countAny,
  }
}

/*
   defineFleetCompo(<expedId>, <fleetCompo or int>):

   - when int is used, it means a fleet of at least that many of ships
   - otherwise it's an Object of fleetCompo

 */
const defineFleetCompo = (id, fleetCompoOrAtLeastNum) => {
  if (_.isInteger(fleetCompoOrAtLeastNum)) {
    const atLeastNum = fleetCompoOrAtLeastNum
    minimalFleetCompos[id] = atLeast(atLeastNum)(mkFleetCompo())
  } else {
    const fleetCompo = fleetCompoOrAtLeastNum
    minimalFleetCompos[id] = fleetCompo
  }
}

// world 1
defineFleetCompo(1, 2)
defineFleetCompo(2, 4)
defineFleetCompo(3, 3)
defineFleetCompo(4, mkFleetCompo(1,'cl',2,'dd'))
defineFleetCompo(5, atLeast(4)(mkFleetCompo(1,'cl',2,'dd')))
defineFleetCompo(6, 4)
defineFleetCompo(7, 6)
defineFleetCompo(8, 6)
defineFleetCompo(100, atLeast(4)(mkFleetCompo(3,'dd')))
defineFleetCompo(101, atLeast(4)(mkFleetCompo(4,'dd')))
defineFleetCompo(102, atLeast(5)(mkFleetCompo(1,'cl',3,'dd')))

// world 2
defineFleetCompo(9, atLeast(4)(mkFleetCompo(1,'cl',2,'dd')))
defineFleetCompo(10, atLeast(3)(mkFleetCompo(2,'cl')))
defineFleetCompo(11, atLeast(4)(mkFleetCompo(2,'dd')))
defineFleetCompo(12, atLeast(4)(mkFleetCompo(2,'dd')))
defineFleetCompo(13, full(mkFleetCompo(1,'cl',4,'dd')))
defineFleetCompo(14, full(mkFleetCompo(1,'cl',3,'dd')))
defineFleetCompo(15, full(mkFleetCompo(2,'cv-like',2,'dd')))
defineFleetCompo(16, full(mkFleetCompo(1,'cl',2,'dd')))
defineFleetCompo(110, full(mkFleetCompo(1,'cl',1,'av',2,'dd')))

defineFleetCompo(111, full(mkFleetCompo(1,'ca',1,'cl',3,'dd')))

// world 3
defineFleetCompo(17, full(mkFleetCompo(1,'cl',3,'dd')))
defineFleetCompo(18, full(mkFleetCompo(3,'cv-like',2,'dd')))
defineFleetCompo(19, full(mkFleetCompo(2,'bbv',2,'dd')))
defineFleetCompo(20, mkFleetCompo(1,'ss-like',1,'cl'))
defineFleetCompo(21, mkFleetCompo(1,'cl',4,'dd'))
defineFleetCompo(22, full(mkFleetCompo(1,'ca',1,'cl',2,'dd')))
defineFleetCompo(23, full(mkFleetCompo(2,'bbv',2,'dd')))
defineFleetCompo(24, full(mkFleetCompo(1,'cl',4,'dd')))

// world 7
defineFleetCompo(41, atLeast(3)(mkFleetCompo(3,'dd')))
defineFleetCompo(45, atLeast(5)(mkFleetCompo(1,'cvl',4,'dd')))

// world 4
defineFleetCompo(25, mkFleetCompo(2,'ca',2,'dd'))
defineFleetCompo(26, mkFleetCompo(1,'cv-like',1,'cl',2,'dd'))
defineFleetCompo(27, mkFleetCompo(2,'ss-like'))
defineFleetCompo(28, mkFleetCompo(3,'ss-like'))
defineFleetCompo(29, mkFleetCompo(3,'ss-like'))
defineFleetCompo(30, mkFleetCompo(4,'ss-like'))
defineFleetCompo(31, mkFleetCompo(4,'ss-like'))
defineFleetCompo(32, mkFleetCompo(1,'ct',2,'dd'))
defineFleetCompo(131, atLeast(5)(mkFleetCompo(1,'av',3,'dd')))

// world 5
defineFleetCompo(33, mkFleetCompo(2,'dd'))
defineFleetCompo(34, mkFleetCompo(2,'dd'))
defineFleetCompo(35, full(mkFleetCompo(2,'cv-like',1,'ca',1,'dd')))
defineFleetCompo(36, full(mkFleetCompo(2,'av',1,'cl',1,'dd')))
defineFleetCompo(37, mkFleetCompo(1,'cl',5,'dd'))
defineFleetCompo(38, full(mkFleetCompo(5,'dd')))
defineFleetCompo(39, mkFleetCompo(1,'as',4,'ss-like'))
defineFleetCompo(40, full(mkFleetCompo(1,'cl',2,'av',2,'dd')))

export {
  minimalFleetCompos,
  atLeast,
  full,
  applyWildcard,
}
