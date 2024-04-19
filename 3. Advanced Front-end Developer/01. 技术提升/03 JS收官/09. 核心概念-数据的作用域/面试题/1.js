// 下面的代码输出什么
// 下面的代码输出什么

console.log(a, b, c);
var a = 1;
var b = function () {};
function c() {}

//执行时，会变量提升，相当于
var a;
var b;
function c() {}
console.log(a, b, c); // undefined, undefined,[Function: c]
a = 1;
b = function () {};

abc();

function abc() {
  console.log("abc");
}
