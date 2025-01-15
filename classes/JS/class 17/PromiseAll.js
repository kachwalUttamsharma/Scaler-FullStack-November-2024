const promise1 = Promise.resolve(3);
const promise2 = Promise.reject(2); // => Promise.resolve(2)
const promise3 = Promise.resolve("any random string");

// Promise.all([promise1, promise2, promise3])
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.log("error: ", error);
//   })
//   .finally(() => {
//     console.log("code executed");
//   });

Promise.myAll = (promises) => {
  return new Promise((resolve, reject) => {
    const results = [];
    let remaining = promises.length;
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i])
        .then((data) => {
          results[i] = data;
          remaining--;
        })
        .catch((error) => {
          return reject(error);
        });
    }
    if (remaining === 0) {
      return resolve(results);
    }
  });
};

Promise.myAll([promise1, promise2, promise3])
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log("error: ", error);
  })
  .finally(() => {
    console.log("code executed");
  });
