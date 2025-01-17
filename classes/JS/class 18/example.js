// cafe => getMenu => put order => served => generate bill => payment => exit

function getMenu(time) {
  console.log("I have entered the cafe");
  const flag = time >= 6 && time <= 10 ? true : false;
  const menu = new Promise(function (resolve, reject) {
    console.log("I have asked for the menu");
    if (flag) {
      resolve("menu is shared or given");
    } else {
      reject("Cafe is Closed, can you come back between 6 and 10");
    }
  });
  return menu;
}

function placeAnOrder(item1, item2) {
  const arr = ["Tea", "Coffee", "MilkShakes", "Biscuits"];
  const orderStatus = new Promise(function (resolve, reject) {
    if (arr.includes(item1) && arr.includes(item2)) {
      resolve(`Order has been placed for ${item1} and ${item2}`);
    } else {
      reject("One of the item or all items are not available that you ordered");
    }
  });
  return orderStatus;
}

function serve() {
  const servingOrder = new Promise(function (resolve) {
    setTimeout(() => {
      resolve(`Order is served, enjoy your time`);
    }, 5000);
  });
  return servingOrder;
}

function generateBill() {
  const bill = new Promise((resolve) => {
    setTimeout(() => {
      resolve("Pay the bill of 500 rupees");
    }, 1500);
  });
  return bill;
}

console.log("before");

// getMenu(7)
//   .then((menu) => {
//     console.log(menu);
//     return placeAnOrder("Tea", "Biscuits");
//   })
//   .then((orderStatus) => {
//     console.log(orderStatus);
//     return serve();
//   })
//   .then((orderIsBeingServed) => {
//     console.log(orderIsBeingServed);
//     return generateBill();
//   })
//   .then((bill) => {
//     console.log(bill);
//     console.log("Payment is done");
//   })
//   .catch((err) => {
//     console.log(err);
//   })
//   .finally(() => {
//     console.log("Thank you for visiting us, and keep coming");
//   });

async function cafeFlow() {
  try {
    const menu = await getMenu(7);
    const placingtheorder = await placeAnOrder("Tea", "Biscuits");
    const orderIsBeingServed = await serve();
    const bill = await generateBill();
    console.log(menu);
    console.log(placingtheorder);
    console.log(orderIsBeingServed);
    console.log(bill);
    console.log("Payment is done");
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Thank you for visiting us, and keep coming");
  }
}

cafeFlow();

console.log("after");
