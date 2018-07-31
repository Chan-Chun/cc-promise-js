const PromiseCanCancel = require('./promise-can-cancel')

const _reverse = (promise) => {
  return new Promise((resolve, reject) => Promise.resolve(promise).then(reject, resolve))
}

const promiseAny = (iterable) => {
  return _reverse(Promise.all([...iterable].map(_reverse)))
}

const promiseSome = (iterable, count) => {
  const values = []
  const errors = []
  let done = false
  let maxError = -count + 1
  return new Promise((resolve, reject) => {
    const resolved = res => {
      values.push(res)
      if (--count === 0) {
        done = true
        resolve(values)
      }
    }
    const rejected = err => {
      errors.push(err)
      if (--maxError === 0) {
        done = true
        reject(values)
      }
    }
    for (item of iterable) {
      maxError++
      new Promise(resolve => {
        resolve(item)
      }).then(res => {
        resolved(res)
      }, err => {
        rejected(err)
      })
    }
  })
}

module.exports = {
  promiseAny,
  promiseSome
}
