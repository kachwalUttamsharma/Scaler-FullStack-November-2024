const p1 = Promise.resolve(200);
const p2 = Promise.reject(404);
const p3 = new Promise((resolve, reject) => {
  try {
    setTimeout(() => resolve(500), 100);
  } catch (error) {
    reject(error);
  }
});
const p4 = 5;

console.log(
  Promise.allSettled([p1, p2, p3, p4])
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    })
);

Promise.myAllSettled = (promises) => {
  return new Promise((resolve, reject) => {
    const results = [];
    let remaining = promises.length;
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i])
        .then((data) => {
          results[i] = { status: "fulfilled", value: data };
          // console.log("result", results);
        })
        .catch((error) => {
          results[i] = { status: "rejected", reason: error };
          // console.log("result", results);
        })
        .finally(() => {
          remaining--;
          if (remaining === 0) {
            resolve(results);
          }
        });
    }
    // resolve(results);
  });
};

console.log("======================");
console.log(
  "polyfill: ",
  Promise.myAllSettled([p1, p2, p3, p4])
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    })
);
