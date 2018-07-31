class PromiseCanCancel extends Promise {
  constructor(callback) {
    this._promise = new Promise((resolve, reject) => {
      this._reject = reject
      return callback(value => {
        resolve(value)
      }, err => {
        reject(err)
      }, handler => {
      })
    })
  }
  then(onFulfilled, onRejected) {
    return this._promise.then(onFulfilled, onRejected)
  }
  catch(onRejected) {
    return this._promise.catch(onRejected)
  }
  finnally(onFinally) {
    return this._promise.finnally(onFinally)
  }
  cancel() {
  }
}

module.exports = PromiseCanCancel
