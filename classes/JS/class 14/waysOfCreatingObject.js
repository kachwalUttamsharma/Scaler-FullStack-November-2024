// Number of Creating Objects in JS

// 1. Object Literals

const obj = {
  name: "John",
  age: 25,
};

console.log(obj);

// 2. Object Constructor

const obj1 = new Object();
obj1.name = "Jane";
obj1.age = 24;

console.log(obj1);

// 3. Contructor Function

function Person(name, age) {
  this.name = name;
  this.age = age;
}

const person1 = new Person("Sumedh", 26);
console.log(person1);
const person2 = new Person("Ketan", 26);
console.log(person2);

// 4. ES6 classes

class Animal {
  constructor(type, sound) {
    this.type = type;
    this.sound = sound;
  }
  eat = "grass";
  makeSound() {
    return this.sound;
  }
}

const dog = new Animal("Dog", "Baw Baw");
const cow = new Animal("Cow", "Ahhh");

console.log(dog);
console.log(cow);
console.log(dog.makeSound());
console.log(cow.makeSound());
console.log(dog.eat);

// 5. object.create
const prototypeObj = {
  name: "rahul prototype",
  age: 28,
};
const obj2 = Object.create(prototypeObj);
console.log("obj2", obj2);
obj2.name = "rahul main";
obj2.age = 28;
console.log("obj2", obj2);

// 6. using factory functions

function createCar(make, model) {
  return {
    make,
    model,
    start() {
      console.log("car started");
    },
  };
}

const car = createCar("Toyota", "Glanza");
console.log(car);
