// 定义变量
var times = 5; // 可以抽奖的次数
var index = -1; // 抽到的奖品list的索引，
var duration = 50; // 抽奖动画的总时长（毫秒）
var currentTimes = 0; // 抽奖动画循环的当前次数
var randomTimes = getRandom(30, 40); // 抽奖动画循环的总次数

var timerId = null; //  定时器ID
// 获取dom
var prizeNumber = $(".prize-number");
var prizeLists = $$(".prize-list");
var startBtn = $(".handler-container-btn");
var dialog = $(".dialog-container");
var closeBtn = $(".close");
var repalyBtn = $(".dialog-main-footer .button");
var content = $(".content");
var contentSpan = $(".active span");
// 运行代码程序
main();
function main() {
  /* ------------------------ 1。初始化 ----------------------- */
  init();
  /* ------------------------ 2. 交互 ----------------------- */
  handlerEvents();
}

function init() {
  // 初始化可以抽奖的次数
  prizeNumber.innerText = times;
}
function handlerEvents() {
  startBtn.onclick = function () {
    runGame();
  };

  closeBtn.onclick = function () {
    dialog.style.display = "none";
  };

  repalyBtn.onclick = function () {
    dialog.style.display = "none";
    times--;
    console.log(times);

    runGame();
    // times--;
    prizeNumber.innerText = times;
  };
}

function selectItem() {
  ++index;
  if (index >= prizeLists.length) {
    index = 0;
  }
  prizeLists.forEach((list) => {
    list.classList.remove("active");
  });
  prizeLists[index].classList.add("active");
}
function runGame() {
  if (timerId || times < 1) {
    return;
  }
  timerId = setInterval(function () {
    selectItem();
    ++currentTimes; //记录动画的选中次数
    // 一次抽奖完成
    if (currentTimes === randomTimes) {
      clearInterval(timerId);
      timerId = null;
      showDialog();
    }
  }, duration);
  currentTimes = 0; // 当前次数归零，重新计数
}

function showDialog() {
  dialog.style.display = "block";
  if (times === 1) {
    repalyBtn.innerHTML = "确定";
  }
  if (index === 4) {
    content.innerHTML = "很遗憾您没有中奖";
  } else {
    content.innerHTML = "恭喜您获得" + prizeLists[index].innerHTML;
  }
}

// 获取dom的函数
function $(selector) {
  return document.querySelector(selector);
}
function $$(selector) {
  return document.querySelectorAll(selector);
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
