const createProtectedObject = (intialObj) => {
  const target = { ...intialObj };
  const handler = {
    get(target, prop) {
      if (prop in target) {
        return target[prop];
      } else {
        throw new Error("Property does not exisit");
      }
    },
    set(target, prop, value) {
      if (prop.length > 3) {
        throw new Error("property key should max length of 3");
      }
      target[prop] = value;
      if (prop in target) {
        target[prop] = value;
        return true;
      } else {
        throw new Error("cannot add a new value");
      }
    },
  };
  return new Proxy(target, handler);
};

const proxy = createProtectedObject({
  eng: "English",
  math: "Mathematics",
});

console.log(proxy);
