const arr = [1, 2, 3, 4, 5];

// add an element at the last index
arr.push(6);
// console.log(arr);
// remove the last element
arr.pop();
// console.log(arr);
// add an element at the starting index
arr.unshift(0);
// console.log(arr);
// remove an element at the starting index
arr.shift();
// console.log(arr);

// splice
// add, removing and replacing
// [1,2,3,4,5]
// starting index and delete count -> removing example
// const arr1 = arr.splice(1, 2);
// console.log(arr1); // [2,3]
// console.log(arr);

// starting index  = 1, no of item to be deleted is 1, and 6,7,8
// console.log(arr);
// const arr1 = arr.splice(1, 1, 6, 7, 8);
// console.log(arr1);
// console.log(arr);

// slice -> slice the piece of cake
// starting index, last index( and last index val is not included)
const arr2 = arr.slice(1, 4);
// console.log(arr2);

const arr3 = [9, 10, 11];
// const res = arr.concat(arr3);
// const res1 = [...arr, ...arr3];
// console.log(res);
// console.log(arr3);
// console.log(res1);

// split
const str = `Hi i am google
Hi i am google 1`;
const strArr = str.split("\n");
console.log(strArr);
const mergedStr = strArr.join("+");
console.log(mergedStr);
