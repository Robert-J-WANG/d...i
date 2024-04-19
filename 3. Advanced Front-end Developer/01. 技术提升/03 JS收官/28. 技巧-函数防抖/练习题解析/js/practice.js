// 当窗口尺寸变化后，调用layout函数

function debounce(fn, duration) {
  // 防抖函数逻辑:
  /*
   1. 返回的是一个函数，
    2.设置定时器，duration时间后执行函数
    3. 执行啥函数？-传入的耗时操作函数fn
    4. 优化：先判断有事件触发，就先清空计时器，直到没有事件触发，就执行计时器函数
    */
  let timerId = null;
  return function () {
    clearTimeout(timerId);
    // 将该函数的this传递到fn
    var curThis = this;
    // 将该函数的参数全部传递给fn
    var args = Array.prototype.slice.call(arguments, 0);

    timerId = setTimeout(function () {
      fn.apply(curThis, args);
    }, duration);
  };
}

var newHandler = debounce(function () {
  layout();
}, 1000);

window.addEventListener("resize", newHandler);
