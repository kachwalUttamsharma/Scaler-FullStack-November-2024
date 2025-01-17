// Promise.resolve(1)
//   .then(() => {
//     return Promise.resolve(2);
//   })
//   .then(() => 3)
//   .then((value) => console.log(value * 3))
//   .then(Promise.resolve(4));

let p = new Promise(function (resolve, reject) {
  setTimeout(function () {
    reject(new Error(300));
  }, 2000);
  //   resolve(100);
  //   setTimeout(function () {
  //     reject(new Error(401));
  //   }, 200);
  //   resolve(200);
  setTimeout(function () {
    reject(new Error(500));
  }, 2000);
});

p.then(function (data) {
  console.log(1);
  console.log(data);
})
  .catch(function (err) {
    console.log(2);
    console.log(err);
  })
  .finally(function () {
    console.log(3);
  });
