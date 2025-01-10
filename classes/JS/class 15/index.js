// synchronous code => this code executes line by line

// console.log("Before");

// function fn() {
//   console.log("I am fn");
// }

// fn();
// console.log("After");

/**
 * Asynchronous code -> piece of code that's executed at the current point of time
 * and other piece of code is executed on later part
 */

// console.log("Before");

// function fn() {
//   console.log("I am fn");
// }

// setTimeout(fn, 1000);
// console.log("After");

// callback function

// let a = true;
// console.log("Before");
// setTimeout(() => {
//   a = false;
//   console.log("I broke the while loop");
// }, 1000);
// console.log("After");

// while (a) {
//   a = false;
// }

// console.log("Before");
// const cb2 = () => {
//   console.log("Set timeout 1");
//   //   while (1) {}
// };
// const cb1 = () => {
//   console.log("hello");
// };
// setTimeout(cb2, 4000);
// setTimeout(cb1, 3000);
// console.log("After");

console.log("Before");
const cb2 = () => {
  let timeInFuture = Date.now() + 5000;
  while (Date.now() < timeInFuture) {}
  console.log("Set timeout 1");
};
const cb1 = () => {
  console.log("hello");
};
setTimeout(cb2, 1000);
setTimeout(cb1, 2000);
console.log("After");
