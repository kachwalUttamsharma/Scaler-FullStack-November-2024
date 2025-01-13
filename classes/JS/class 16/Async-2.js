const { runMLAlgo, promiseRunMLAlgo } = require("./lib");

// inversion of control

let amount = 100;
const priceOfItem = 20;

function cb() {
  amount = amount - priceOfItem;
  console.log("remaining amount in wallet : ", amount);
}

// runMLAlgo(amount, cb);

promiseRunMLAlgo()
  .then(() => {
    cb();
  })
  .catch((error) => {
    console.log(error);
  });
