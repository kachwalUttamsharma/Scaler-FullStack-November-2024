const fs = require("fs");

console.log("before");

// pyramid of doom || callback hell
// fs.readFile("./f1.txt", function (err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log(data.toString());
//     fs.readFile("./f2.txt", function (err, data) {
//       if (err) {
//         console.log("Error", err);
//       } else {
//         console.log(data.toString());
//         fs.readFile("./f3.txt", function (err, data) {
//           if (err) {
//             console.log("Error", err);
//           } else {
//             console.log(data.toString());
//             fs.readFile("./f4.txt", function (err, data) {
//               if (err) {
//                 console.log("Error", err);
//               } else {
//                 console.log(data.toString());
//               }
//             });
//           }
//         });
//       }
//     });
//   }
// });

function f1cb(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log(data.toString());
    fs.readFile("./f2.txt", f2cb);
  }
}

function f2cb(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log(data.toString());
    fs.readFile("./f3.txt", f3cb);
  }
}
function f3cb(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log(data.toString());
    fs.readFile("./f4.txt", f4cb);
  }
}
function f4cb(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log(data.toString());
  }
}
fs.readFile("./f1.txt", f1cb);
console.log("After");
