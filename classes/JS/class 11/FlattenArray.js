// input array: [1,2,3,[4,5,6], [7,8], 9]
// output: [1,2,3,4,5,6,7,8,9]

const myflat = function (arr) {
  if (!arr || !Array.isArray(arr)) {
    throw new Error("expected parameter should be an array");
  }
  const newArr = [];
  for (let i = 0; i < arr.length; i++) {
    const elem = arr[i];
    if (Array.isArray(elem)) {
      newArr.push(...myflat(elem));
    } else {
      newArr.push(elem);
    }
  }
  return newArr;
};

const arr = [1, 2, 3, [4, [5, 6]], [7, 8], 9];
const res = myflat(arr);
console.log(arr);
console.log(res);
