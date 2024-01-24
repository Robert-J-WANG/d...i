// 根据下面的调用和注释，完成函数 createOptions

// createOptions(); // { time: 1000, speed: 50, text: '' }
// createOptions({
//   time: 500,
// }); // { time: 500, speed: 50, text: '' }

// createOptions({
//   time: 500,
//   text: "hello world",
// }); // { time: 500, speed: 50, text: 'hello world' }

/* ------------------------- 我做的 ------------------------ */
/* 
function createOptions(obj) {
  const { time, speed, text } = obj || {};
  return {
    time: time || 1000,
    speed: speed || 50,
    text: text || "",
  };
} 
*/
/* ------------------------- 参考 ------------------------- */
function createOptions(options) {
  // 如果没有传递配置对象（undefined），让其为空对象
  var options = options || {};
  // 定义默认配置对象
  var defaultOptions = {
    time: 500,
    speed: 50,
    text: "",
  };
  // 让传入的配置对象覆盖默认配置对象
  return {
    ...defaultOptions,
    ...options,
  };
}

console.log(createOptions());
console.log(
  createOptions({
    time: 500,
  })
);
console.log(
  createOptions({
    time: 500,
    text: "hello world",
  })
);

console.log(
  createOptions({
    time: 500,
    text: "hello world",
    titile: "world",
  })
);
