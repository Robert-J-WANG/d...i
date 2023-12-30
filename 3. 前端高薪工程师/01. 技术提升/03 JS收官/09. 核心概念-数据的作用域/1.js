// function m() {
//   var a;
//   function b() {}
//   var c;
//   console.log(a, b, c);
//   a = 1;

//   c = function () {};
// }

// m();

if (true) {
  var a = 100; // a的作用域是全局
}
console.log(a);

for (var i = 0; i < 2; i++) {
  // i的作用域是全局
  var b = 200; // b的作用域是全局
}

console.log(i, b);

function sum() {
  var b = 2; // b 的作用域是函数 sum
  function sayHi() {
    // sayHi 的作用域是函数 sum
    console.log("Hi");
  }
}

console.log(b, sayHi()); // 无法再函数外面访问
