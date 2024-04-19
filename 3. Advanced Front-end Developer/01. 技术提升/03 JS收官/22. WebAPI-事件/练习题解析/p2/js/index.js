// 每隔1秒自动切换图片

var timer = null;

function start() {
  var curIndex = 2;
  if (timer) return;
  timer = setInterval(function () {
    $("img").src = "./img/" + curIndex + ".jpeg";
    curIndex++;
    if (curIndex === 5) {
      curIndex = 1;
    }
  }, 1000);
  console.log("start");
}
function stop() {
  clearInterval(timer);
  timer = null;
  console.log("stop");
}

start();
// 当鼠标移动到元素上时停止切换，移出后开始切换
$("img").addEventListener("mouseenter", start);
$("img").addEventListener("mouseleave", stop);

/**
 *
 * @param {*} selector  选择器名称
 * @returns  选中的dom对象
 */
function $(selector) {
  return document.querySelector(selector);
}
