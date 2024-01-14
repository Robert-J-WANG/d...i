(function () {
  // 准备数据和变量
  var urls = [
    "./img/Wallpaper1.jpg",
    "./img/Wallpaper2.jpg",
    "./img/Wallpaper3.jpg",
    "./img/Wallpaper4.jpg",
    "./img/Wallpaper5.jpg",
  ];
  var curIndex = 0;
  var timerId = null;
  var duration = 1500;
  // 获取dom
  // 技巧：将所有需要的变量存储到一个对象中
  var doms = {
    container: $(".carousel-container"),
    carouselList: $(".carousel-list"),
    indicator: $(".indicator"),
    arrowLeft: $(".arrow-left"),
    arrowRight: $(".arrow-right"),
  };

  /* ------------------------- 1.初始化 ------------------------ */
  init();

  /* ------------------------- 2.交互 ------------------------- */
  doms.container.onmouseenter = stopMove;
  doms.container.onmouseleave = startMove;
  doms.arrowLeft.onclick = prev;
  doms.arrowRight.onclick = next;
  for (var i = 0; i < doms.indicator.children.length; i++) {
    // 闭包处理
    (function (i) {
      doms.indicator.children[i].onclick = function () {
        setActive(i);
      };
    })(i);
  }
  /* ------------------------ 初始化函数 ----------------------- */
  function init() {
    // 根据数据动态生成图片列表
    for (var i = 0; i < urls.length; i++) {
      // 1. 生成图片列表
      var carouselItem = document.createElement("img");
      carouselItem.className = "carousel-item";
      carouselItem.src = urls[i];
      doms.carouselList.appendChild(carouselItem);
      // 2. 生成指示小点列表
      var indicatorItem = document.createElement("span");
      indicatorItem.className = "indicator-item";
      doms.indicator.appendChild(indicatorItem);
    }
    // 复制第一张图片，并添加到图片列表最后，用于无缝轮播
    doms.carouselList.appendChild(
      doms.carouselList.children[0].cloneNode(true)
    );
    // 设置图片列表容器的宽度
    doms.carouselList.style.width = doms.carouselList.children.length + "00%";
    // 设置第一张图片为默认选中
    setActive(curIndex);
    // 自动轮播
    startMove();
  }
  /* ------------------------ 功能函数 ------------------------ */
  // 1. 选中函数
  function setActive(newIndex) {
    // 不使用动画
    doms.carouselList.style.marginLeft = -(newIndex * 100) + "%";
    // 使用动画;
    // var from = doms.carouselList.offsetLeft;
    // var to = newIndex * doms.container.offsetWidth;
    // createAnimation({
    //   from: from,
    //   to: to,
    //   totalMS: 2000,
    //   duration: 10,
    //   onmove: function (n) {
    //     doms.carouselList.style.marginLeft = -n + "px";
    //   },
    // });

    // 取消已经激活的
    var active = $(".indicator-item.active");
    if (active) {
      active.classList.remove("active");
    }
    //  激活当前的
    doms.indicator.children[newIndex].classList.add("active");
  }
  // 2. 播放下一张
  function next() {
    curIndex++;
    // 实现无限轮播
    if (curIndex >= urls.length) {
      curIndex = 0;
    }
    setActive(curIndex);
  }
  // 3. 播放上一张
  function prev() {
    curIndex--;
    if (curIndex < 0) {
      curIndex = urls.length - 1;
    }
    setActive(curIndex);
  }
  // 4. 开始自动播放
  function startMove() {
    timerId = setInterval(next, duration);
  }
  // 5. 结束自动播放
  function stopMove() {
    clearInterval(timerId);
  }

  function $(selector) {
    return document.querySelector(selector);
  }
})();
