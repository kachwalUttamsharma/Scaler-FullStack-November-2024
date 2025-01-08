// static functions on object

const target = { a: 1 };
const source = { b: 2, c: 3 };

Object.assign(target, source);

console.log("target", target);
console.log("source", source);

// keys() & values() & entries()

console.log(Object.keys(target));
console.log(Object.values(target));
console.log(Object.entries(target));

// seal() vs freeze()

// freeze:  you cannot manipulate exisiting properties or add new properties into object
const obj = { name: "John" };
Object.freeze(obj);
obj.name = "Guru"; // this wont throw error
obj.age = 25;
console.log("before delete ", obj);
delete obj.name;
console.log("after delete ", obj);

// final the keys in obj but you can manipulate the values and
//  you cannot add new properties into obj
const newobj = { name: "guru" };
Object.seal(newobj);
newobj.name = "siva";
newobj.age = 25;
console.log("before delete ", newobj);
delete newobj.name;
console.log("after delete ", newobj);

// property descriptors

const newobj1 = { name: "ketan" };
console.log(Object.getOwnPropertyDescriptor(newobj1, "name"));
console.log(newobj1);
// delete newobj1.name;
// console.log(newobj1);
// for (let entry in newobj1) {
//   console.log(entry);
// }

// writable => update the values
// enumerable => while iteration whether value should be shown
// configurable => delete property or not

const obj4 = {};
Object.defineProperty(obj4, "name", {
  value: "ketan",
  writable: false,
  enumerable: true,
  configurable: true,
});
Object.defineProperty(obj4, "age", {
  value: 25,
  writable: true,
  enumerable: false,
  configurable: true,
});
Object.defineProperty(obj4, "country", {
  value: "India",
  writable: true,
  enumerable: true,
  configurable: false,
});

delete obj4.country;
obj4.country = "SA";
console.log(Object.getOwnPropertyDescriptors(obj4));
console.log(obj4);
console.log(obj4.age);

// id : writable: false, configurable: false, enumerable: true
// _password_: writable: false, configurable: false, enumerable: false
