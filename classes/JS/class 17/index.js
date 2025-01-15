const fs = require("fs");

const promise = fs.promises.readFile("./f1.txt");

// promise.finally(() => {
//   console.log("code executed");
// });
// promise.catch((err) => {
//   console.log(err.toString());
// });
// promise.then((data) => {
//   console.log(data.toString());
// });
// promise.then((data) => {
//   console.log(data.toString());
// });
// promise.finally(() => {
//   console.log("code executed");
// });
// promise.catch((err) => {
//   console.log(err.toString());
// });

promise
  .then((data) => {
    console.log(data.toString());
    // return Promise.resolve(data);
    return data; // => Promise.resolve(data)
  })
  .then((data) => {
    console.log(data.toString());
    throw new Error("from second then");
    return data;
  })
  .catch((error) => {
    console.log("catch1 ", error);
    return error;
  })
  .then((error) => {
    console.log("promise returned from catch block ", error);
  })
  .catch((error) => {
    console.log("catch2 ", error);
  })
  .finally(() => {
    console.log("code executed");
  });
