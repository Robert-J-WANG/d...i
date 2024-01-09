function createAnimation(options) {
  var from = options.from; // 起始值
  var to = options.to; // 结束值
  var totalMS = options.totalMS || 1000; // 变化总时间
  var duration = options.duration || 15; // 动画间隔时间
  var times = Math.floor(totalMS / duration); // 变化的次数
  var dis = (to - from) / times; // 每一次变化改变的值
  var curTimes = 0; // 当前变化的次数
  var timerId = setInterval(function () {
    from += dis;
    curTimes++; // 当前变化增加一次
    if (curTimes >= times) {
      // 变化的次数达到了
      from = to; // 变化完成了
      clearInterval(timerId); // 不再变化了
      options.onend && options.onend();
    }
    // 无数的可能性
    options.onmove && options.onmove(from);
  }, duration);
}

// createAnimation({
//   from: 0,
//   to: 120,
//   totalMS: 500,
//   duration: 15,
//   onmove: function (n) {
//     // n为这一次变化的值
//     //  这个回调函数在实现业务逻辑
//     console.log(n);
//   },
//   onmove: function () {
//     // 变化完成后执行该方法
//     console.log("变化完成了");
//   },
// });

// function createAnimation(options) {
//   var from = options.from; // 其实值
//   var to = options.to; // 结束值
//   var totalMS = options.totalMS || 1000; // 变化的总时间
//   var duration = options.duration || 10; // 变化的间隔

//   var times = Math.floor(totalMS / duration); // 变化的次数
//   var dis = (to - from) / times; // 每一次变化改变的值
//   var curTime = 0; // 当前变化的次数

//   var timerId = setInterval(function () {
//     from += dis;
//     curTime++; // 记录变化的次数
//     // 处理用户的业务，无法处理，有不知道用户又做什么？？
//     // 请你给我传一个函数进来，from 值变化一次，我就运行一次你传入的函数
//     // 这种方式就叫回调模式
//     options.onmove && options.onmove(from); // 将变化的值from回传出去

//     // 当变化结束（达到了变化的总次数)
//     if (curTime >= times) {
//       // 清除计数器，不在变化
//       from = to;
//       clearInterval(timerId);
//       // 变化结束后做什么？？
//       options.onend && options.onend();
//     }
//   }, duration);
// }
