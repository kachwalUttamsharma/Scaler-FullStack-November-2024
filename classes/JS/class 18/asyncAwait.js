function promise1() {
  return new Promise((resolve, reject) => {
    try {
      console.log("before timeout");
      setTimeout(() => {
        reject(5);
      }, 5000);
      console.log("after timeout");
    } catch (error) {
      reject(error);
    }
  });
}

// console.log(3);
// promise1()
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
// console.log(4);

console.log(3);

const data = async () => {
  try {
    const result = await promise1();
    console.log(result);
  } catch (error) {
    console.log("from error message", error);
  }
};
data();
console.log(4);
