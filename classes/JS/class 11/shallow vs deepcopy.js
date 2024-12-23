const obj = {
  A: "guru",
  B: "Shravan",
  C: {
    firstname: "Vaibhav",
    lastname: "pratab",
  },
  D: function abc() {
    console.log("abc");
  },
};

// shallow copy
const obj1 = { ...obj }; // C => same ref
const obj2 = Object.assign({}, obj);
obj2.C.firstname = "uttam";
obj2.A = "sharma";
// console.log("obj", obj);
// console.log("obj2", obj2);

// deep clone
const obj3 = JSON.parse(JSON.stringify(obj));
obj3.C.firstname = "uttam-1";
obj3.A = "sharma-1";
// console.log("obj", obj);
// console.log("obj3", obj3);

// polyfill for deepcopy of array or object
const superClone = (object) => {
  const cloning = Array.isArray(object) ? [] : {};
  for (let prop in object) {
    if (Array.isArray(object[prop]) || typeof object[prop] === "object") {
      cloning[prop] = superClone(object[prop]);
    } else {
      cloning[prop] = object[prop];
    }
  }
  return cloning;
};
const obj4 = superClone(obj);
obj4.C.firstname = "uttam-1";
obj4.A = "sharma-1";
obj4.D = function def() {
  console.log("def");
};
console.log("obj", obj);
console.log("obj4", obj4);
console.log(obj.D());
console.log(obj4.D());
