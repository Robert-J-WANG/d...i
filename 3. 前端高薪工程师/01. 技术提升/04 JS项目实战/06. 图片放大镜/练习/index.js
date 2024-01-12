// 初始化数据图片
var imgs = {
  // 小图
  small: ["imgA_1.jpg", "imgB_1.jpg", "imgC_1.jpg"],
  // 中图
  middle: ["imgA_2.jpg", "imgB_2.jpg", "imgC_2.jpg"],
  // 大图
  large: ["imgA_3.jpg", "imgB_3.jpg", "imgC_3.jpg"],
};

// 获取一些将要使用的dom元素
// document.getElementsByClassName('container')[0]
// document.querySelector('.container');
var container = $(".container");
var largeImg = $(".right-img");
var midImg = $(".left-img");
var smallImg = $(".img-list");
var mask = $(".mask");
var curIndex = 0;

main();
function main() {
  /* ---------------------- 1. 初始化页面 ---------------------- */
  initPage();
  /* ------------------------ 2. 交互 ----------------------- */
  // 1. 点击缩略图，选中图片
  smallImg.onclick = function (e) {
    if (e.target.tagName === "LI") {
      // this.children是伪数组，转换成真数组，才能使用indexOf方法
      curIndex = [].indexOf.call(this.children, e.target);
      setActive(curIndex);
    }
  };
  // 2. 鼠标移动显示遮罩层和大图，移出隐藏
  midImg.onmousemove = function (e) {
    mask.style.opacity = 1;
    largeImg.style.opacity = 1;

    // 根据鼠标位置计算遮罩层的位置
    // e.clientX - 鼠标在浏览器中坐标
    // midImg.offsetLeft - 图片容器相对于浏览器的坐标
    // mask.offsetWidth - 遮罩层的宽高尺寸
    var left = e.clientX - midImg.offsetLeft - mask.offsetWidth / 2;
    var top = e.clientY - midImg.offsetTop - mask.offsetHeight / 2;

    // 边界条件
    if (left <= 0) {
      left = 0;
    }
    if (top <= 0) {
      top = 0;
    }
    if (left >= midImg.offsetWidth - mask.offsetWidth) {
      left = midImg.offsetWidth - mask.offsetWidth;
    }
    if (top >= midImg.offsetHeight - mask.offsetHeight) {
      top = midImg.offsetHeight - mask.offsetHeight;
    }
    // 根据top和left调整mask的位置
    mask.style.left = left + "px";
    mask.style.top = top + "px";

    // 根据top 和 left，修改大图的位置，background-position-x
    largeImg.style.backgroundPositionX = -left + "px";
    largeImg.style.backgroundPositionY = -top + "px";
  };

  midImg.onmouseleave = function () {
    mask.style.opacity = 0;
    largeImg.style.opacity = 0;
  };
}

function initPage() {
  // 动态渲染缩略图
  var str = "";
  for (var i = 0; i < imgs.small.length; i++) {
    str += `<li style="background-image: url(./images/${imgs.small[i]})"></li>`;
  }
  smallImg.innerHTML = str;
  // 设置第一个图片为active
  setActive(curIndex);
}

function setActive(curIndex) {
  for (var i = 0; i < imgs.small.length; i++) {
    smallImg.children[i].classList.remove("active");
  }
  smallImg.children[curIndex].classList.add("active");
  midImg.style.backgroundImage = `url(./images/${imgs.middle[curIndex]})`;
  largeImg.style.backgroundImage = `url(./images/${imgs.large[curIndex]})`;
}

// 封装一个获取DOM元素的方法

// 单一元素
function $(selector) {
  return document.querySelector(selector);
}

// 多个元素
function $$(selector) {
  return document.querySelectorAll(selector);
}
