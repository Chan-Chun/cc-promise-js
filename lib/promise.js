function reverse(promise) {
  return new Promise((resolve, reject) => Promise.resolve(promise).then(reject, resolve))
}

const promiseAny = (iterable) => {
  return reverse(Promise.all([...iterable].map(reverse)))
}

module.exports = {
  promiseAny
}
