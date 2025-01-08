// blueprint
// class Person {
//   // name, age
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   greet() {
//     console.log(`Hi, My Name is ${this.name} and I am ${this.age} years old.`);
//   }
// }

// const person = new Person("karthikey", "26");
// const person1 = new Person("Guru", "23");

// console.log(person);
// person.greet();

// reusable objects -> constructor function

// function name should start capital letter
// function Person(name, age) {
//   this.name = name;
//   this.age = age;
// }

// Person.prototype.greet = function () {
//   console.log(`Hi, My Name is ${this.name} and I am ${this.age} years old.`);
// };
// const person = new Person("karthikey", "26");
// console.log(person);

// class is syntactic sugar over constructor function

class Animal {
  constructor(name) {
    this.name = name;
  }
  makeSound() {
    console.log(`${this.name} makes a sound.`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  makeSound() {
    console.log(`${this.name}, this ${this.breed}, barks.`);
  }
}

// function Animal(name) {
//   this.name = name;
// }
// Animal.prototype.makeSound = function () {
//   console.log(`${this.name} makes a sound.`);
// };

// function Dog(name, breed) {
//   // this -> Dog
//   Animal.call(this, name);
//   this.breed = breed;
// }

// // inheritance == extends
// // Object.setPrototypeOf(Dog.prototype, Animal.prototype);
// Dog.prototype = Object.create(Animal.prototype);
// Dog.prototype.constructor = Dog;

// Dog.prototype.makeSound = function () {
//   console.log(`${this.name}, this ${this.breed}, barks.`);
// };
// const dog = new Dog("Duke", "Begal");
// console.log(dog);
// dog.makeSound();

// static

// static methods or variables are available on class directly (there is no need to create object)
// Array.isArray()

// class MathHelper {
//   static add(a, b) {
//     return a + b;
//   }

//   static subtract(a, b) {
//     return a - b;
//   }
// }

function MathHelper() {}
MathHelper.add = function (a, b) {
  return a + b;
};
MathHelper.subtract = function (a, b) {
  return a - b;
};

const math = new MathHelper();
console.log(MathHelper.add(2, 3));
console.log(MathHelper.subtract(5, 3));

// function Counter() {}

// Counter.count = 0;

// Counter.increment = function () {
//   Counter.count++;
// };

class Counter {
  static count = 0;
  static increment() {
    Counter.count++;
  }
}

Counter.increment();
Counter.increment();
console.log(Counter.count);
