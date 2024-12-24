const input = {
  firstName: "John",
  lastName: "Doe",
  address: {
    street: "North 1st street",
    city: "San Jose",
    state: "CA",
    country: "USA",
    postCodes: {
      firstBlock: 10,
      secondBlock: 12,
    },
  },
};

// This function will take the a nested object and make it flat and return
function flattenObject(objectJSONs, nastingKey = "", respons = {}) {
  Object.entries(objectJSONs).forEach(([key, value]) => {
    const keyName = nastingKey ? `${nastingKey}.${key}` : key;
    if (typeof value === 'object') {
      flattenObject(value, keyName, respons);
    } else {
      respons[keyName] = value;
    }
  });
  return respons;
}

// This function only have key not nesting information
function flattenObject_WithKeysOnly(objectJSONs, respons = {}) {
  Object.entries(objectJSONs).forEach(([key, value]) => {
    if (typeof value === 'object') {
      flattenObject(value, respons);
    } else {
      respons[key] = value;
    }
  });
  return respons;
}

const flatObject = flattenObject(input);
console.log(flatObject);

// const output = {
//   firstName: "John",
//   lastName: "Doe",
//   "address.street": "North 1st street",
//   "address.city": "San Jose",
//   "address.state": "CA",
//   "address.country": "USA",
//   "address.postCodes.firstBlock": 10,
//   "address.postCodes.secondBlock": 12,
// };
