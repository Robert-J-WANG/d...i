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
var doms = {
  container: document.querySelector(".container"),
};
var imgWidth = 220;
var containerWidth = doms.container.clientWidth;
var number = Math.floor(containerWidth / imgWidth); //每一行图片的个数
var gap = (containerWidth - number * imgWidth) / number; //每一行图片的间隔
var imgTops = [];
var imgHeight = 0;
var minTop = 0;
var minIndex = null;
var curIndex = 0;

// 初始化
init();
// 交互

function init() {
  // 初始化imgTops数组
  for (var i = 0; i < number; i++) {
    imgTops.push(i);
  }
  getImgMinTop();
  // 添加第一张图片
  createImg(updateImgTops);
  for (var i = 0; i < number; i++) {
    curIndex++;
    createImg(updateImgTops);
  }

  // 在这里使用更新后的imgTops
  // 其他逻辑功能
}

function createImg(callback) {
  var img = document.createElement("img");
  img.src = urls[curIndex];
  img.onload = function () {
    img.style.width = imgWidth;
    img.classList.add("active");
    doms.container.appendChild(img);
    img.style.top = minTop + gap + "px";
    img.style.left = (imgWidth + gap) * minIndex + gap / 2 + "px";
    callback(img.clientHeight);
  };
}

function getImgMinTop() {
  for (var i = 0; i < imgTops.length; i++) {
    if (minTop >= imgTops[i]) {
      minTop = imgTops[i];
      minIndex = i;
    }
  }
}
function updateImgTops(imgHeight) {
  // 更新最小高度
  imgTops[minIndex] = minTop + gap + imgHeight;
}
