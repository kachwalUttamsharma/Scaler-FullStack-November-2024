// functions

function fn(param) {
  //console.log("hello world", param);
}

// not defined (reference error) - if variable used is not present in
// the document then it will result in not defined (absence of redeclaration)
// const argument = "adil";
let argument;
fn(argument);

// in js all variables are intialized with undefined value before execution of code

// objects

const captainAmerica = {
  name: "Steve Rogers",
  isAvenger: true,
  address: {
    city: "brooklyn",
    state: "new york",
  },
  movies: ["first avenger", "civil war", "infinity war"],
  saveTheWorld: function () {
    console.log("On the way ! consider it done");
  },
  true: 1,
  1: 2,
};

// key: string or number - string
// value: any primitive or non-primitive data type
// console.log(captainAmerica);
// console.log(captainAmerica.name);
// const movies = "movies";
// console.log(captainAmerica[movies]);

// on object for in

for (let key in captainAmerica) {
  if (key === "movies") {
    console.log(Array.isArray(captainAmerica.movies));
  }
  console.log(typeof captainAmerica[key], " ", key);
  //   console.log(captainAmerica[key]);
}
