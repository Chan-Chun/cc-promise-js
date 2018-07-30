const { promiseAny } = require('../lib/promise')
const assert = require('assert')

describe('promise', () => {
  it('promise-any', () => {
    promiseAny([
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
    ]).then(res => {
      assert.equal(res, 2)
    })
  })
})
