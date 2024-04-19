// 全局数据变量
var imgWidth = 300; // 每张图片定宽
var duration = 500; // 防抖定时器时间

// 获取dom
var container = document.querySelector(".container");

/* ------------------------- 初始化 ------------------------ */
init();
/* ------------------------- 交互 ------------------------- */
window.onresize = function () {
  // 设置防抖
  clearTimeout(timerId);
  var timerId = setTimeout(function () {
    setPositions();
  }, duration);
};

/**
 * 初始化页面-先动态渲染出图片
 */
function init() {
  // 1. 根据urls数据动态生成图片
  for (var i = 0; i < urls.length; i++) {
    var img = document.createElement("img");
    img.src = urls[i];
    img.width = imgWidth;
    container.appendChild(img);
    // 图片加载完毕，才能执行其他逻辑功能
    img.onload = setPositions;
  }
}

/**
 * 图片加载完成后， 设置每一张图片的位置
 */
function setPositions() {
  // 等图片加载完生成img top数组，并计算出gap
  var info = createImgTopArr();
  var arr = info.arr;
  var gap = info.gap;
  // 等图片加载完生成,设置每一张图片的位置
  for (var i = 0; i < container.children.length; i++) {
    // 计算img的top和left
    var img = container.children[i];
    var minTop = getMin(arr);
    var minIndex = arr.indexOf(minTop);
    var top = minTop + gap;
    var left = minIndex * (imgWidth + gap) + gap;
    // 设置img的top和left;
    img.style.top = top + "px";
    img.style.left = left + "px";
    // 更新arr的值
    arr[minIndex] = minTop + gap + img.clientHeight;
  }

  // 更新 container的高度
  var maxTop = getMax(arr);
  container.style.height = maxTop + gap + "px";
}

/**
 *
 * @returns 返回一个数组，存储每一列图片的高度，和图片之间的间隔
 */
function createImgTopArr() {
  var arr = [];
  var gap = 0;
  var columnNum = Math.floor(container.clientWidth / imgWidth);
  gap = (container.clientWidth - columnNum * imgWidth) / (columnNum + 1);
  for (var i = 0; i < columnNum; i++) {
    arr.push(0);
  }
  return { arr, gap };
}

/**
 * 求数组元素最小值
 * @param {number} arr 数组
 * @returns 数组元素最小值
 */
function getMin(arr) {
  var min = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i];
    }
  }
  return min;
}

/**
 * 求数组元素最大值
 * @param {number} arr 数组
 * @returns 数组元素最大值
 */
function getMax(arr) {
  var max = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}
