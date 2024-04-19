// var a = 1; // 避免污染
// var b = 2; // 避免污染
// // 暴露为：sayHi
// function hello() {
//   console.log('hello world');
// }
// // 暴露为：count
// var count = 1;

var dengge = (function () {
  var a = 1; // 避免污染
  var b = 2; // 避免污染
  // 暴露为：sayHi
  function hello() {
    console.log("hello world");
  }
  // 暴露为：count
  var count = 1;

  return {
    sayHi: hello,
    count: count,
  };
})();
