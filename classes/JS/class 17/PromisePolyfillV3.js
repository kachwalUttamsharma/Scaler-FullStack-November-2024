const STATUS = {
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

function CustomPromise(executorFn) {
  let state = STATUS.PENDING;
  let result;
  const successCallbacks = [];
  const failureCallbacks = [];
  const finallyCallbacks = [];

  const executeCallbacks = () => {
    if (state === STATUS.RESOLVED) {
      successCallbacks.forEach((callback) => callback(result));
    } else if (state === STATUS.REJECTED) {
      failureCallbacks.forEach((callback) => callback(result));
    }
    finallyCallbacks.forEach((callback) => callback());
    successCallbacks.length = 0;
    failureCallbacks.length = 0;
    finallyCallbacks.length = 0;
  };

  const resolve = (value) => {
    if (state === STATUS.PENDING) {
      state = STATUS.RESOLVED;
      result = value;
      setTimeout(executeCallbacks, 0);
    }
  };

  const reject = (value) => {
    if (state === STATUS.PENDING) {
      state = STATUS.REJECTED;
      result = value;
      setTimeout(executeCallbacks, 0);
    }
  };

  this.then = (onSuccess) => {
    return new CustomPromise((resolve, reject) => {
      successCallbacks.push((value) => {
        try {
          const result = onSuccess ? onSuccess(value) : value;
          resolve(result);
        } catch (err) {
          reject(err);
        }
      });
      if (state === STATUS.RESOLVED) {
        setTimeout(executeCallbacks, 0);
      }
    });
  };

  this.catch = (onFailure) => {
    return new CustomPromise((resolve, reject) => {
      failureCallbacks.push((error) => {
        try {
          const result = onFailure ? onFailure(error) : undefined;
          if (onFailure) {
            resolve(result);
          } else {
            reject(error);
          }
        } catch (err) {
          reject(err);
        }
      });
      if (state === STATUS.REJECTED) {
        setTimeout(executeCallbacks, 0);
      }
    });
  };

  this.finally = (callback) => {
    return new CustomPromise((resolve, reject) => {
      const handler = () => {
        try {
          callback();
          if (state === STATUS.RESOLVED) {
            resolve(result);
          } else if (state === STATUS.REJECTED) {
            reject(result);
          }
        } catch (err) {
          reject(err);
        }
      };

      finallyCallbacks.push(handler);
      if (state !== STATUS.PENDING) {
        setTimeout(executeCallbacks, 0);
      }
    });
  };

  try {
    executorFn(resolve, reject);
  } catch (err) {
    reject(err);
  }
}

const myPromise = new CustomPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("Hello from enhanced custom promise!");
  }, 1000);
});

myPromise
  .then((data) => {
    console.log("Then 1:", data);
    return "Next value";
  })
  .then((data) => console.log("Then 2:", data))
  .catch((error) => console.error("Error:", error))
  .finally(() => console.log("Finally: Cleanup or additional tasks"));
