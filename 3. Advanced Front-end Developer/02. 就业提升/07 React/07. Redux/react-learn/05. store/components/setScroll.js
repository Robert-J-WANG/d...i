let timer1, timer2; // 先定义2个定时器

export default function setScroll() {
  clearInterval(timer1, timer2);
  const htmlElement = document.documentElement;
  let { scrollTop, scrollLeft } = htmlElement;
  timer1 = animate(scrollTop, 0, 500, (value) => {
    htmlElement.scrollTop = value;
  });
  timer2 = animate(scrollLeft, 0, 500, (value) => {
    htmlElement.scrollLeft = value;
  });
}

/**
 * 从一个数过渡到另一个数的函数
 * @param {*} start 起始位置
 * @param {*} end 结束为止
 * @param {*} duration 动画总时长
 * @param {*} callback 用户传递一个回调函数，将每次变化后的start传递出去
 */
function animate(start, end, duration, callback) {
  let timer;
  let curTime = 0;
  const tick = 16; // 每隔16毫秒执行一次循环
  const times = Math.ceil(duration / tick); // 总共执行的次数
  const total = end - start;
  const step = total / times; // 每次移动的步长
  timer = setInterval(() => {
    curTime++;
    start = start + step;
    if (curTime === times) {
      start = end;
      clearInterval(timer);
    }
    callback(start);
  }, tick);
  return timer;
}
