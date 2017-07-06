import {
  pickSomeFrom,
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
})
