var abc = (function () {
  var a = 1; // 不希望污染全局
  var b = 2; // 不希望污染全局

  function c() {
    console.log(a + b);
  }

  var d = 123;
  return {
    c: c,
    d: d,
  };
})();

// var a = 1;

// function b() {
//   console.log("b");
// }

// var c = function () {
//   console.log("c");
// };

// 相当于给全局对象window添加了属性
// window.a;
// window.b;
// window.c;
