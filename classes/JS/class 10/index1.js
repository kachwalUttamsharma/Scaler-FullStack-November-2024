// JS is neither purely pass by value nor pass by reference
// for non-primitives it behaves like reference and for primitives it behaves like value.
// if you try to override non primitive completely it works like pass by value
function func(param1, param2) {
  param1 = 45;
  param2 = 50;
}
const a = 20;
const b = {
  a: 35,
};
func(a, b);

console.log(a);
console.log(b);
