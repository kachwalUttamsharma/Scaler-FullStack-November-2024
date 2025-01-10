// import * as fs from 'fs';
const fs = require("fs");

// console.log("Before");
// const buffer = fs.readFileSync("./f1.txt");
// console.log(buffer.toString());
// console.log("After");

// console.log("Before");
// fs.readFile("./f1.txt", function (err, data) {
//   if (err) {
//     console.log("err ", err);
//     return;
//   }
//   console.log(data.toString());
// });
// console.log("After");

// series
// console.log("Before");
// const buffer1 = fs.readFileSync("./f1.txt");
// const buffer2 = fs.readFileSync("./f2.txt");
// console.log(buffer1.toString(), buffer2.toString());
// console.log("After");

// parallel
console.log("Before");
fs.readFile("./f1.txt", function (err, data) {
  if (err) {
    console.log("err ", err);
    return;
  }
  console.log(data.toString());
});
fs.readFile("./f2.txt", function (err, data) {
  if (err) {
    console.log("err ", err);
    return;
  }
  console.log(data.toString());
});
console.log("After");

// parallel and use the output and do something out of it
console.log("Before"); // sync

const cb1 = function (err, data) {
  if (err) {
    console.log("err ", err);
    return;
  }
  const content1 = data.toString(); // sync
  fs.readFile("./f2.txt", function (err, data) {
    // async
    if (err) {
      console.log("err ", err);
      return;
    }
    const content2 = data.toString();
    console.log(content1, content2); // sync
  });
};

fs.readFile("./f1.txt", cb1); // async

console.log("After"); // sync
