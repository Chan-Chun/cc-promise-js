const PromiseCanCancel = require('./promise-can-cancel')

const _reverse = promise => {
  return new Promise((resolve, reject) => Promise.resolve(promise).then(reject, resolve))
}

const _all = promise => {
  return new Promise(resolve => Promise.resolve(promise).then(resolve, resolve))
}

const promiseAny = iterable => {
  return _reverse(Promise.all([...iterable].map(_reverse)))
}

const promiseAllDone = iterable => {
  return Promise.all([...iterable].map(_all))
}

const promiseSome = (iterable, count) => {
  const values = []
  const errors = []
  let maxError = -count + 1
  return new Promise((resolve, reject) => {
    const resolved = res => {
      values.push(res)
      if (--count === 0) {
        resolve(values)
      }
    }
    const rejected = err => {
      errors.push(err)
      if (--maxError === 0) {
        reject(values)
      }
    }
    for (const item of iterable) {
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
  promiseSome,
  promiseAllDone,
  PromiseCanCancel
}
