// class Shape {
//   static totalShapes = 0;
//   constructor(type) {
//     this.type = type;
//     Shape.totalShapes++;
//   }

//   describe() {
//     console.log(`This is a ${this.type}`);
//   }
// }

// class Circle extends Shape {
//   constructor(radius) {
//     super("Circle");
//     this.radius = radius;
//   }

//   area() {
//     return 2 * Math.PI * this.radius;
//   }
// }

// class Rectangle extends Shape {
//   constructor(length, bredth) {
//     super("Reactangle");
//     this.length = length;
//     this.bredth = bredth;
//   }

//   area() {
//     return this.length * this.bredth;
//   }
// }

function Shape(type) {
  this.type = type;
  Shape.totalShapes++;
}
Shape.totalShapes = 0;
Shape.prototype.describe = function () {
  console.log(`This is a ${this.type}`);
};

function Circle(radius) {
  Shape.call(this, "Circle");
  this.radius = radius;
}

Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.area = function () {
  return 2 * Math.PI * this.radius;
};

function Rectangle(length, bredth) {
  Shape.call(this, "Rectangle");
  this.length = length;
  this.bredth = bredth;
}
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.area = function () {
  return this.length * this.bredth;
};

const circle = new Circle(2);
const rectangle = new Rectangle(2, 2);
console.log(circle);
console.log("area of circle", circle.area());
console.log(rectangle);
console.log("area of rectangle", rectangle.area());
console.log(Shape.totalShapes);
