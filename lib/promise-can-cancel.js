class PromiseCanCancel{
  constructor(callback) {
    this._handleCancel = []
    this._canCancel = true
    this._promise = new Promise((resolve, reject) => {
      this._reject = reject
      return callback(value => {
        this._canCancel = false
        resolve(value)
      }, err => {
        this._canCancel = false
        reject(err)
      }, handler => {
        this._handleCancel.push(handler)
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
  cancel(reason) {
    if (!_canCancel) {
      return
    }
    if (_handleCancel.length > 0) {
      try {
        for (const item of this._handleCancel) {
          item()
        }
      } catch(err) {
        this._reject(err)
      }
    }
    this._canCancel = false
    this._reject(reason)
  }
}

Object.setPrototypeOf(PromiseCanCancel.prototype, Promise.prototype);

module.exports = PromiseCanCancel
