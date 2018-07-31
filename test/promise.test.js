const { promiseAny, promiseSome } = require('../lib/promise')
const assert = require('assert')

const testArray = [
  new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(1)
    }, 1000)
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2)
    }, 2000)
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(3)
    }, 3000)
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(4)
    }, 4000)
  })
]

describe('promise', () => {
  it('promise-any', () => {
    promiseAny(testArray).then(res => {
      assert.equal(res, 2)
    })
  })

  it('promise-some', () => {
    promiseSome(testArray, 2).then(res => {
      assert.deepEqual(res, [2, 4])
    })
  })
})
