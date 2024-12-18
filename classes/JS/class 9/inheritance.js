Array.prototype.sum = function () {
  let sum = 0;
  for (let i = 0; i < this.length; i++) {
    sum += this[i];
  }
  console.log(sum);
};

const arr = [1, 2, 3, 4];
const arr1 = [2, 4];

console.log(typeof arr); // object

arr.push(12);

// reuse of code
// save up memory

// next usecase is whatif i want to create reusable method
