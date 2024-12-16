var a = 10;
var a = "adil";
// redeclare

var b = 20;
b = "sumedh";
// reassign or reintialization

console.log(a);
console.log(b);

// es 6 - ecma 2016

let c = 10;
// let c = "adil";
c = "adil";
console.log(c);
// cannot redeclare same variable when you use let keyword but you can reintialize it

const d = 10;
d = "adil";
console.log(d);
// cannot redeclare same variable when you use const keyword and also cannot reintialize it

//       redeclare    reinitialize
// var     yes          yes
// let     no           yes
// const   no           no
