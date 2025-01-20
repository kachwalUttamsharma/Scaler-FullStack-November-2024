// map | filter | reduce doesnt override or make changes to original array

// map

const arr = [1, 2, 3];

// it iterates over each index
const newArr = arr.map((num) => {
  num = num * 2;
  return num;
});

console.log(newArr);

const modifieldArr = [...arr, ...newArr];

const evenNumbers = modifieldArr.filter((num) => num % 2 === 0);
const oddNumber = modifieldArr.filter((num) => num % 2 !== 0);

console.log(evenNumbers);
console.log(oddNumber);

const num = [1, 2, 3, 4];

const sum = num.reduce((acc, num) => {
  return acc + num;
}, 0);
console.log(sum);

const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 43, 34, 567, 34, 34];

// 1. multiple each number by 3;
// 2. fitler it by divisible by 6;
// 3. find sum of all

const result = arr1
  .map((num) => num * 3)
  .filter((num) => num % 6 === 0)
  .reduce((acc, num) => acc + num, 0);

console.log(result);
