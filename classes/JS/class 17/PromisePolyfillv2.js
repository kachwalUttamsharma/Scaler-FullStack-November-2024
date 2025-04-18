const STATUS = {
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

function CustomPromise(executorFn) {
  let state = STATUS.PENDING;
  let result;
  const successandFinallyCallbacks = [];
  const failureandFinallyCallbacks = [];
  //   const finallyCallbacks = [];

  const resolve = (value) => {
    if (state === STATUS.PENDING && state !== STATUS.REJECTED) {
      state = STATUS.RESOLVED;
      result = value;
      successandFinallyCallbacks.forEach((thenFunc) => thenFunc(result));
      //   finallyCallbacks.forEach((finallyFunc) => finallyFunc());
    }
  };

  const reject = (value) => {
    if (state === STATUS.PENDING && state !== STATUS.RESOLVED) {
      state = STATUS.REJECTED;
      result = value;
      failureandFinallyCallbacks.forEach((failureFunc) => failureFunc(result));
      //   finallyCallbacks.forEach((finallyFunc) => finallyFunc());
    }
  };

  this.then = (onSuccess) => {
    if (state === STATUS.RESOLVED) {
      onSuccess(result);
    } else {
      successandFinallyCallbacks.push(onSuccess);
    }
    return this;
  };

  this.catch = (onFailure) => {
    if (state === STATUS.REJECTED) {
      onFailure(result);
    } else {
      failureandFinallyCallbacks.push(onFailure);
    }
    return this;
  };

  this.finally = (callback) => {
    if (state !== STATUS.PENDING) {
      callback();
    } else {
      successandFinallyCallbacks.push(callback);
      failureandFinallyCallbacks.push(callback);
    }
    return this;
  };

  executorFn(resolve, reject);
}

const myPromise = new CustomPromise((resolve, reject) => {
  try {
    setTimeout(() => {
      resolve("Hello, from custom promise");
    }, 1000);
    // resolve("Hello, from custom promise");
  } catch (error) {
    reject(error);
  }
});

myPromise.then((data) => console.log(data.toString()));
myPromise.catch((error) => console.log(error.toString()));
myPromise.finally(() => console.log("code executed"));

console.log("======================");

myPromise
  .then((data) => console.log(data.toString()))
  .catch((error) => console.log(error.toString()))
  .finally(() => console.log("code executed"));
