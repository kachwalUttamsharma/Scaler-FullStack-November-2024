const fs = require("fs");

console.log("before");
const promise = fs.promises.readFile("./f1.txt");
console.log(promise);
console.log("after");

// setTimeout(() => {
//   console.log("after file is read");
//   console.log(promise);
// }, 2000);

// then catch finally
// promise => successfull (resolved) => then
// failure (rejected) => catch
// irrespective of successfull or failure finally block will execute surely

// // successfull usecase
// promise.then((futureValue) => {
//   console.log(futureValue.toString());
// });

// // error case
// promise.catch((error) => {
//   console.log("error : ", error);
// });

// // will execute surely
// promise.finally(() => {
//   console.log("finally block");
// });

// promise
//   .then((futureValue) => {
//     console.log(futureValue.toString());
//   })
//   .catch((error) => {
//     console.log("error : ", error);
//   })
//   .finally(() => {
//     console.log("finally block");
//   });

// promise
//   .then((futureValue) => {
//     console.log(futureValue.toString());
//     const promise2 = fs.promises.readFile("./f2.txt");
//     promise2
//       .then((futureValue) => {
//         console.log(futureValue.toString());
//         const promise3 = fs.promises.readFile("./f3.txt");
//         promise3
//           .then((futureValue) => {
//             console.log(futureValue.toString());
//             const promise4 = fs.promises.readFile("./f4.txt");
//             promise4
//               .then((futureValue) => {
//                 console.log(futureValue.toString());
//               })
//               .catch((error) => {
//                 console.log("error : ", error);
//               });
//           })
//           .catch((error) => {
//             console.log("error : ", error);
//           });
//       })
//       .catch((error) => {
//         console.log("error : ", error);
//       });
//   })
//   .catch((error) => {
//     console.log("error : ", error);
//   });

// promise
//   .then((futureValue) => {
//     console.log(futureValue.toString());
//     const promise2 = fs.promises.readFile("./f2.txt");
//     return promise2;
//   })
//   .then((futureValue) => {
//     console.log(futureValue.toString());
//     const promise3 = fs.promises.readFile("./f3.txt");
//     return promise3;
//   })
//   .then((futureValue) => {
//     console.log(futureValue.toString());
//     const promise4 = fs.promises.readFile("./f4.txt");
//     return promise4;
//   })
//   .then((futureValue) => {
//     console.log(futureValue.toString());
//   })
//   .catch((error) => {
//     console.log("error : ", error);
//   });

function promiseReadFile(filePath) {
  return new Promise((res, rej) => {
    fs.readFile(filePath, function (err, data) {
      if (err) {
        rej(err);
      } else {
        res(data);
      }
    });
  });
}

promiseReadFile("./f1.txt")
  .then((future) => {
    console.log(future.toString());
    return promiseReadFile("./f2.txt");
  })
  .then((future) => {
    console.log(future.toString());
    return promiseReadFile("./f3.txt");
  })
  .then((future) => {
    console.log(future.toString());
    return promiseReadFile("./f4.txt");
  })
  .then((future) => {
    console.log(future.toString());
  })
  .catch((error) => {
    console.log(error);
  });
