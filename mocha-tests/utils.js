import _ from 'lodash'
import {
  pickSomeFrom,
  modifyObject,
  memoizeFixedArity,
  shallowCompactObject,
} from '../src/utils'

const assert = require('assert')

const spec = it

describe('utils', () => {
  spec('pickSomeFrom', () => {
    const xs = [4,5,'a']
    assert.deepEqual(
      pickSomeFrom(0)(xs),
      [{pickedList: [], remained: xs}])

    assert.deepEqual(
      pickSomeFrom(1)(xs),
      [
        {pickedList: [4], remained: [5,'a']},
        {pickedList: [5], remained: ['a']},
        {pickedList: ['a'], remained: []},
      ])

    assert.deepEqual(
      pickSomeFrom(2)(xs),
      [
        {pickedList: [4,5], remained: ['a']},
        {pickedList: [4,'a'], remained: []},
        {pickedList: [5,'a'], remained: []},
      ])
  })

  spec('modifyObject', () => {
    const original = {a: {b: {c: 10,f: 1}}, d: 20}

    assert.deepEqual(
      modifyObject('d', () => 'dd')(original),
      {...original, d: 'dd'})

    assert.deepEqual(
      modifyObject(
        'a',
        modifyObject(
          'b',
          modifyObject(
            'c',
            x => x+1)))(original),
      {a: {b: {c: 11,f: 1}}, d: 20})

    assert.deepEqual(
      modifyObject(
        'a',
        () => undefined)(original),
      {a: undefined, d: 20})

    assert.deepEqual(
      modifyObject(
        'a',
        () => undefined,
        true
      )(original),
      {d: 20})
  })

  spec('memoizeFixedArity', () => {
    let execCount = 0
    const f = (a,b,c,d) => {
      ++execCount
      return [a,b,c,d]
    }

    const genRandomValue = () => {
      const randomStrings = Object.getOwnPropertyNames(Object)
      const randomObjects = _.fill(new Array(100)).map(() => ({}))
      const gen = _.sample([
        () => _.random(1,1000),
        () => null,
        () => undefined,
        // just for getting a list of random strings
        () => _.sample(randomStrings),
        () => _.sample(randomObjects),
      ])
      return gen()
    }

    // generate some argument lists
    const argLists = _.fill(new Array(100))
      .map(() => _.fill(new Array(4)).map(genRandomValue))

    const memoized = memoizeFixedArity(4)(f)
    argLists.map(args => memoized(...args))
    const nowExecCount = execCount
    const shuffledArgLists = _.shuffle(argLists)
    shuffledArgLists.map(args => {
      const result = memoized(...args)
      assert.deepEqual(result,args)
    })
    // all values are cached
    assert.equal(nowExecCount, execCount)
  })

  spec('shallowCompactObject', () => {
    const obj = {a: undefined, b: 1, c: undefined}

    assert.throws(() =>
      assert.deepEqual({a: undefined},{}))

    assert.deepEqual(shallowCompactObject(obj),{b: 1})
  })
})
