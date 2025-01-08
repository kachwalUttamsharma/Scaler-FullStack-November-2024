const map = new Map();
// set, get, has, size, delete, clear
map.set("firstName", "Sumedh");
map.set("lastName", "Singh");
console.log(map.get("firstName"));
console.log(map);
console.log(map.has("firstName"));
console.log(map.size);
map.delete("firstName");
console.log(map);
map.clear();
console.log(map);

// unique items into it
// add,has,size, delete, clear
const set = new Set();
set.add(1);
set.add(1);
set.add(2);
set.delete(1);
console.log(set.has(1));
console.log(set.size);
console.log(set.clear());
console.log(set);

// weakmap

// key : object
let obj = { key: "firtname" };
const obj1 = { key: "lastname" };
const map1 = new WeakMap();
map1.set(obj, "Sumedh");
map1.set(obj1, "Singh");
obj = 2;
console.log(map1.get(obj));
console.log(map1.get(obj1));
console.log(obj);

// weakset
let obj2 = { key: "firtname" };
const obj3 = { key: "lastname" };
const set1 = new WeakSet();
set1.add(obj2);
set1.add(obj3);
console.log(set1);
console.log(set1.has(obj2));
obj2 = 3;
console.log(set1.has(obj2));
