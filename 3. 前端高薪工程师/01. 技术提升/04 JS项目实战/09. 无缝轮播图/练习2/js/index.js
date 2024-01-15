(function () {
  // 准备数据和变量
  var curIndex = 0; // 记录当前显示的是第几张图片
  var isPlaying = false; // 记录动画的状态
  var timerId = null; // 自动播放计时器ID
  var duration = 2000; // 自动播放时间间隔
  // 获取dom
  // 技巧：将所有需要的变量存储到一个对象中
  var doms = {
    container: $(".carousel-container"),
    carouselList: $(".carousel-list"),
    indicator: $(".indicator"),
    arrowLeft: $(".arrow-left"),
    arrowRight: $(".arrow-right"),
  };
  var urls = [
    "./img/Wallpaper1.jpg",
    "./img/Wallpaper2.jpg",
    "./img/Wallpaper3.jpg",
    "./img/Wallpaper4.jpg",
    "./img/Wallpaper5.jpg",
  ];
  var containerWidth = doms.container.clientWidth; // 容器可见区域的宽度

  /* ------------------------- 1.初始化 ------------------------ */
  init();

  /* ------------------------- 2.交互 ------------------------- */
  // 指示器注册点击事件
  for (var i = 0; i < doms.indicator.children.length; i++) {
    (function (i) {
      doms.indicator.children[i].onclick = function () {
        moveTo(i);
      };
    })(i);
  }
  doms.arrowLeft.onclick = prev;
  doms.arrowRight.onclick = next;
  doms.container.onmouseenter = stopMove;
  doms.container.onmouseleave = startMove;

  /* ------------------------ 初始化函数 ----------------------- */
  function init() {
    // 内部函数
    /**
     * 创建img元素，并将img添加到carouselList容器里
     * @param {string} src img的src地址
     */
    function _createImg(src) {
      var carouselItem = document.createElement("img");
      carouselItem.className = "carousel-item";
      carouselItem.src = src;
      doms.carouselList.appendChild(carouselItem);
    }

    for (var i = 0; i < urls.length; i++) {
      // 1.根据数据动态生成图片列表
      _createImg(urls[i]);
      // 4. 根据数据动态生成指示小点列表
      var indicatorItem = document.createElement("span");
      indicatorItem.className = "indicator-item";
      doms.indicator.appendChild(indicatorItem);
    }
    // 2.另外创建一张第一张图片，并添加到图片列表最后，用于无缝轮播
    _createImg(urls[0]);
    // 3. 设置图片列表容器的宽度
    doms.carouselList.style.width = doms.carouselList.children.length + "00%";
    // 5.设置指示器的激活状态（curIndex为0，激活第一张图片）
    setIndicatorStatusActive();

    // 6. 自动轮播
    startMove();
  }
  /* ------------------------ 功能函数 ------------------------ */
  /**
   * 根据curIndex,设置指示器的激活状态
   */
  function setIndicatorStatusActive() {
    // 1. 将目前已经是激活状态的，取消激活
    var active = $(".indicator-item.active");
    if (active) {
      active.classList.remove("active");
    }
    // 2. 将当前的设为激活状态
    //技巧 2： 设置curIndex的边界
    // 方法1：使用求余数的方法

    var index = curIndex % urls.length;
    doms.indicator.children[index].classList.add("active");

    // 方法2：
    /* 
  if (curIndex >= urls.length) {
    curIndex = 0;
  }
  doms.indicator.children[curIndex].classList.add("active"); 
  */
  }

  /**
   * 将指定位置的图片移动到可视区
   * 变化carouselList容器的marginLeft值
   * @param {number} newIndex 新的位置的图片的索引
   */
  function moveTo(newIndex, afterMove) {
    // 1.使用动画， 改变 carouselList的marginLeft
    var from = parseFloat(doms.carouselList.style.marginLeft) || 0; // 当前carouselList的marginLeft
    var to = -newIndex * containerWidth; // 移动之后carouselList的marginLeft
    //xxx 技巧3：动画防抖开关设置
    // 1. 设置开关条件
    if (isPlaying || curIndex === newIndex) {
      return; // 如果有动画，或者切换同一个图片。则不进行任何操作
    }
    // 2.关闭开关
    isPlaying = true; // 动画开始时，标记为ture
    createAnimation({
      from: from,
      to: to,
      totalMS: 500,
      duration: 10,
      onmove: function (n) {
        doms.carouselList.style.marginLeft = n + "px";
      },
      onend: function () {
        // 3. 打开开关
        isPlaying = false; // 动画结束后，标记为false
        afterMove && afterMove(); // 动画完成后，调用这个传递过来的回调函数
      },
    });
    //2. 更新当前图片的索引
    curIndex = newIndex;
    //3. 更新指示器的激活状态
    setIndicatorStatusActive();
  }
  // 2. 播放下一张
  function next() {
    var afterMove = null;
    var newIndex = curIndex + 1;
    // xxx : 实现无限轮播
    // 最后一张图片列表时
    if (newIndex === doms.carouselList.children.length - 1) {
      // 等动画完成后：
      afterMove = function () {
        // 瞬间回到第一张图片
        doms.carouselList.style.marginLeft = 0;
        // 更新当前的索引
        curIndex = 0;
      };
    }
    moveTo(newIndex, afterMove);
  }
  // 3. 播放上一张
  function prev() {
    var newIndex = curIndex - 1;
    var maxIndex = doms.carouselList.children.length - 1;
    if (newIndex < 0) {
      // 先让carouselList回到的最后一张图片的位置
      doms.carouselList.style.marginLeft = -maxIndex * containerWidth + "px";
      // 再让新的index为carouselList倒数第二张（实际图片数量的最后一张）
      newIndex = maxIndex - 1;
    }
    moveTo(newIndex);
  }
  // 4. 开始自动播放
  function startMove() {
    // 防止多个计时器叠加
    if (timerId) return;
    timerId = setInterval(next, duration);
  }
  // 5. 结束自动播放
  function stopMove() {
    clearInterval(timerId); //停止动画
    timerId = null; //计时器清零
  }

  function $(selector) {
    return document.querySelector(selector);
  }
})();

/* ----------------------- 技巧与问题细节 ---------------------- */
// 1. 定义对象doms来存储所以需要使用到的dom
/* 
var doms = {
  container: $(".carousel-container"),
  carouselList: $(".carousel-list"),
  indicator: $(".indicator"),
  arrowLeft: $(".arrow-left"),
  arrowRight: $(".arrow-right"),
}; 
*/
// 2. 判断index边界问题，使用求余数的方式
/* 
var index = curIndex % urls.length;
doms.indicator.children[index].classList.add("active"); 
*/

// 3. 动画防抖的问题：定义一个单独的变量开关，来控制动态播放的状态
/* 
if (isPlaying) {
  return; // 如果有动画，则不进行下面代码执行
}
isPlaying = true; // 动画开始时，标记为ture
createAnimation({
  ...
  onmove: function (n) {
    ...
  },
  onend: function () {
    isPlaying = false; // 动画结束后，标记为false
  },
}); 
*/
