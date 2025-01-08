// let num = 10;

// function fn() {
//   let num = 20;
//   console.log(num);
//   // its memory (inside b()) + lexical scope for closure
//   function b() {
//     console.log(num);
//   }
//   return b;
// }

// const returnedFn = fn();

// returnedFn();

// function outerFunction() {
//   let count = 0;
//   function innerFunction() {
//     count++;
//     return count;
//   }
//   return innerFunction;
// }

// const innerFunc = outerFunction();
// console.log(innerFunc()); // 1
// console.log(innerFunc()); // 2
// console.log(innerFunc()); // 3

// const innerFunc1 = outerFunction();
// console.log(innerFunc1()); // 1
// console.log(innerFunc1()); // 2
// console.log(innerFunc1()); // 3

function createCounter(init, delta) {
  function count() {
    init = init + delta;
    return init;
  }
  return count;
}

const e1 = createCounter(10, 5);
console.log(e1());
console.log(e1());

const e2 = createCounter(10, 5);
console.log(e2());

// 15 15 - up
// 15 20 - down

let iamINGEC = 200;
function getFirstName(firstName) {
  console.log("I have got your first Name");
  return function getLastName(lastName) {
    console.log("I have got Your last Name");
    return function greeter() {
      console.log(`Hi I am ${firstName} ${lastName}`);
      console.log("Hi GEC", iamINGEC);
    };
  };
}

const fnNameReturn = getFirstName("Shravan"); // I have got your first Name
console.log(fnNameReturn);
const lnNameReturn = fnNameReturn("kumar"); // I have got Your last Name
console.log(lnNameReturn);
lnNameReturn();
// Hi I am Shravan kumar
// Hi GEC 200
