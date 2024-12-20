// default param meter value
function fn(param1, param2, param3 = "defaultValue") {
  console.log("hi params are", param1, param2, param3);
}

// optional either you can pass or you can ignore
fn("hi", "hello");
fn("hi1", "hello1", "holla2");

const arr = [1, [2, 3], 4, 5];
// const arr2 = arr;
// push and pop
// push add new element into array at the end
// pop remove last element from array
// arr2.pop();
arr.push(100);
// console.log(arr2);
console.log(arr);

const num1 = 10;
let num2 = num1;
num2 += 10;
// console.log(num1, num2);

// spread operator
// ... destructuring

// cloning -> non primitive -> primitive -> then storing back as non primitive
// const arr4 = [];
// for (let i = 0; i < arr.length; i++) {
//   arr4.push(arr[i]);
// }
// const arr3 = [...arr];
// // arr3[1] = [3, 4, 5];
// arr3[1].push(20);
// arr3.push(200);
// console.log("original arr", arr);
// console.log("cloned arr", arr3);

// deep clone

// JSON.stringify(arr); // i am converting arr into a string
// console.log(typeof JSON.stringify(arr), JSON.stringify(arr));
// console.log(Array.isArray(JSON.parse(JSON.stringify(arr))));

const arr5 = JSON.parse(JSON.stringify(arr));
// arr3[1] = [3, 4, 5];
arr5[1].push(200);
arr5.push(2000);
// console.log("original arr", arr);
// console.log("cloned arr", arr5);

// deepclone - own function - homework
// array , obj -> ... (shallow clone)
function func(param1, ...param2) {
  console.log("hi params are", param1, param2);
}

func("hi", "hello", "hello1", "hello2", [2, 3, 4, 5]);

const obj = {
  name: "Steve",
  age: 30,
  greet: function () {
    return "Hello!";
  },
};
const jsonString = JSON.stringify(obj);
console.log(jsonString);
console.log(JSON.parse(jsonString));

// rest, spread
// shallow copy and deep copy
