const { promiseAny, promiseSome, PromiseCanCancel } = require('../lib/promise')
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

describe('promise some && promise any', () => {
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

describe('promise can cancel', () => {
  it('promise-can-cancel', () => {
    const aCanCancelPromise = new PromiseCanCancel((resolve, reject, onCancel) => {
      setTimeout(() => {
        resolve()
      }, 10000)
      onCancel(() => {
        console.log('It cancel')
      })
    })
    setTimeout(() => {
      aCanCancelPromise.cancel('I just wanna cancel')
    }, 5000)
    aCanCancelPromise.then(res => {
      assert.ifError(res)
    }).catch(err => {
      assert.ifError(err)
    })
  })
  it('promise-can-cancel', () => {
    const aCanCancelPromise = new PromiseCanCancel((resolve, reject, onCancel) => {
      setTimeout(() => {
        resolve('Should display')
      }, 2000)
      onCancel(() => {
        console.log('It cancel')
      })
    })
    setTimeout(() => {
      aCanCancelPromise.cancel('I just wanna cancel anyway')
    }, 5000)
    aCanCancelPromise.then(value => {
      assert.equal(value, 'Should display')
    }).catch(err => {
      assert.ifError(err)
    })
  })
})

