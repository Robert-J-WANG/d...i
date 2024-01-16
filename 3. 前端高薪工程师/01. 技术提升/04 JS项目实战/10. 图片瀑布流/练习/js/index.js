var urls = [
  "../img/0.jpg",
  "../img/1.jpg",
  "../img/2.jpg",
  "../img/3.jpg",
  "../img/4.jpg",
  "../img/5.jpg",
  "../img/6.jpg",
  "../img/7.jpg",
  "../img/8.jpg",
  "../img/9.jpg",
  "../img/10.jpg",
];
var container = document.querySelector(".container");
var imgWidth = 220;
// 初始化
init();
// 交互

function init() {
  createImgs();
}

function createImgs() {
  for (var i = 0; i < urls.length; i++) {
    var img = document.createElement("img");
    img.src = urls[i];
    img.style.width = imgWidth;
    container.appendChild(img);
    img.onload = setPositions;
  }
}

function setPositions() {
  var info = cal();
  // 计算imgLeft, top
  var minTop = info.minTop;
  var gap = info.gap;
  var index = info.index;
  console.log(this);
  // 设置图片top
  this.style.top = minTop + "px";
  // 更新imgTops数组
  minTop += this.clientHeight + gap;

  // 设置图片LEFT
  this.style.left = index * (imgWidth + gap) + gap + "px";
}
function cal() {
  var containerWidth = container.clientWidth;
  var imgNumber = Math.floor(containerWidth / imgWidth); //每一行图片的个数
  var gap = (containerWidth - imgNumber * imgWidth) / (imgNumber + 1); //每一行图片的间隔
  // 根据imgNumber生成imgTops数组
  var imgTops = [];
  for (var i = 0; i < imgNumber; i++) {
    imgTops.push(0);
  }
  // 计算出数组最小高度
  var minTop = getMin(imgTops);
  // 计算最小高度对应的index
  var index = imgTops.indexOf(minTop);

  return { gap, minTop, index };
}

function getMin(arr) {
  var min = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i];
    }
  }
  return min;
}
