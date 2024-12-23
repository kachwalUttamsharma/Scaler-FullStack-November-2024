// // function defination vs function expression

// // function defination
// function abc() {
//   console.log("abc");
// }

// // function expression
// const abc3 = function () {
//   console.log("abc");
// };

// const abc1 = function abc() {
//   console.log("abc");
//   console.log(this);
// };

// const abc2 = () => {
//   console.log("abc");
//   console.log(this);
// };

// const obj = {
//   abc1,
//   abc2,
// };

// obj.abc1();
// obj.abc2();

// // HOF: higher order function
// // function which can either or both accepts function and return function

// // cdf -> higher order
// function cdf(abc) {
//   abc();
// }
// cdf(abc1);

// array => map, filter, reduce, find
const cap = {
  name: "steve",
  sayHi: function () {
    console.log("Hi from", this.name);
  },
};
cap.sayHi(); // steve
const sayHiAdd = cap.sayHi;
sayHiAdd();
