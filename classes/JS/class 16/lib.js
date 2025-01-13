function runMLAlgo(cb) {
  console.log("running ml algo");
  console.log("processing the payment");
  setTimeout(function () {
    console.log("Payment Done!");
    cb();
    cb();
    cb();
    cb();
    cb();
  }, 1000);
}

function promiseRunMLAlgo() {
  return new Promise((resolve, reject) => {
    try {
      console.log("running ml algo");
      console.log("processing the payment");
      setTimeout(function () {
        console.log("Payment Done!");
        resolve();
        resolve();
        resolve();
        resolve();
        resolve();
      }, 1000);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  runMLAlgo,
  promiseRunMLAlgo,
};
