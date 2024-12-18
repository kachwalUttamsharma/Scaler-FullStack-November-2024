// var a = 10;

// function fn() {
//   console.log("I am fn"); // 1

//   function inner() {
//     console.log("I am inner"); // 2
//   }
//   inner();
//   var c = 10;
//   console.log(c);
// }

// fn();

// var b = 10;
// console.log(b);

// console.log(c);
// var c = 20;
// console.log(c);

// // console.log(d);
// // console.log(e);
// let d = 30;
// const e = 40;
// console.log(d, " ", e);

// let and const block scoped

// function real() {
//   console.log("I am real. Always run me");
// }
// function real() {
//   console.log("No I am real one ");
// }
// real();
// function real() {
//   console.log("You both are wasted");
// }

// var a = 10;
// console.log(a);

// function fn() {
//   let a = 20;
//   console.log(a);
//   a++;
//   console.log(a);
//   if (a) {
//     a = 30;
//     a++;
//     console.log(a);
//   }
//   console.log(a);
// }
// fn();
// console.log(a);

// 10, 20, 21, 31, (21, 31 ?) = 31 , (31,10 ?) = 10

// let and const
// let fruits = "apple";
// console.log(fruits); // apple
// {
//   //   console.log(fruits);
//   let fruits;
//   console.log(fruits);
//   fruits = "orange";
//   {
//     console.log(fruits);
//     let fruits;
//   }
//   console.log(fruits);
// }
// console.log(fruits);
// "use strict";
var firstName = "Loki";
let cap = {
  firstName: "Steve",
  sayHi: function () {
    console.log("53", this.firstName); // 53 steve
    function subInner() {
      console.log("54", this.firstName); // 54 loki
      const iAmInner = () => {
        console.log("55", this.firstName);
      };
      iAmInner();
    }
    subInner();
  },
};
cap.sayHi();

// const ladder = {
//   stop: 0,
//   up() {
//     this.stop++;
//     return this;
//   },
//   down() {
//     this.stop--;
//     return this;
//   },
//   showStep: function () {
//     console.log(this.stop);
//     return this;
//   },
// };
// ladder.up();
// ladder.up();
// ladder.up();
// ladder.down();
// ladder.showStep();

// ladder.up().up().up().down().showStep();
