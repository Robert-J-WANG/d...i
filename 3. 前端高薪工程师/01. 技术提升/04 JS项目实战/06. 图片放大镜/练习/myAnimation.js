function createAnimation(options) {
  var from = options.from;
  var to = options.to;
  var totalMS = options.totalMS || 1000;
  var duration = options.duration || 20;
  var times = totalMS / duration;
  var dis = (to - from) / times;
  var curTime = 0;
  var timerId = setInterval(function () {
    from += dis;
    options.onmove && options.onmove(from);
    curTime++;
    if (curTime >= times) {
      curTime = 0;
      clearInterval(timerId);
      options.onend && options.onend();
    }
  }, duration);
}
