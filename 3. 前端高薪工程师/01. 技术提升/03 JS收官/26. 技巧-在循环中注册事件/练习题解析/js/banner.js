var banner = (function () {
  // 完成横幅区的图片切换
  // 横幅区数据
  var datas = [
    {
      img: "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/15c05b32cf948b594477dfc3eb69fb69.jpg?w=2452&h=920",
      link: "https://www.mi.com/mi11le-5g-ne",
    },
    {
      img: "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/a532e33470d046b3f044d5ea49fc5e9e.png?thumb=1&w=2452&h=920&f=webp&q=90",
      link: "https://www.mi.com/xiaomipad5",
    },
    {
      img: "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/918820682e4a490221cfd92b24c14b86.jpg?thumb=1&w=2452&h=920&f=webp&q=90",
      link: "https://www.mi.com/a/h/22033.html?sign=b60a6ca9167bce2d1ed8ee319cf83c75",
    },
    {
      img: "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/af7be8f65065f405f57f46a02731f78d.jpg?thumb=1&w=2452&h=920&f=webp&q=90",
      link: "https://www.mi.com/a/h/22812.html?sign=aab397a7ecf2ae4c1765e9d11fdccca6",
    },
  ];

  // 需要的dom
  var banner = $(".banner");
  var bannerDots = $(".banner-dots");
  var bannerCover = $(".banner-cover");
  var bannerImg = $(".banner-cover img");
  var pointLeft = $(".banner-pointer-left");
  var pointRight = $(".banner-pointer-right");

  // 当前显示图片的索引
  var curIndex = 0;
  /**
   * 初始化函数，根据datas的数量动态创建小点的个数，只执行一次
   */
  function init() {
    for (var i = 0; i < datas.length; i++) {
      var span = document.createElement("span");
      span.className = "fl";
      bannerDots.appendChild(span);
    }
    // 选择显示的图片
    change(curIndex);
    // 自动播放函数
  }
  init();

  /**
   * 需要显示哪一张图片？
   * @param {*} index 显示哪一张图片的索引
   */

  function change(index) {
    for (var i = 0; i < datas.length; i++) {
      bannerCover.href = datas[index].link;
      bannerImg.src = datas[index].img;
    }
    // 先清除所有的样式
    for (var i = 0; i < bannerDots.children.length; i++) {
      bannerDots.children[i].className = "fl";
    }
    // 再给当前的小点添加样式
    bannerDots.children[index].className = "banner-dots-selected fl";
  }

  function goPrev() {
    curIndex--;
    if (curIndex < 0) {
      curIndex = datas.length - 1;
    }
    change(curIndex);
  }
  function goNext() {
    curIndex++;
    if (curIndex >= datas.length) {
      curIndex = 0;
    }
    change(curIndex);
  }

  // 自动播放的函数
  var timer = null;
  function start() {
    if (timer) return;
    timer = setInterval(goNext, 1000);
  }

  function stop() {
    clearInterval(timer);
    timer = null;
  }

  start();

  function $(selector) {
    return document.querySelector(selector);
  }

  // 左右箭头注册点击事件
  pointLeft.addEventListener("click", goPrev);
  pointRight.onclick = goNext;

  /* ------------------- 循环给小点注册点击事件-方法1 ------------------ */

  // for (var i = 0; i < bannerDots.children.length; i++) {
  //   (function (i) {
  //     bannerDots.children[i].onclick = function () {
  //       curIndex = i;
  //       change(curIndex);
  //     };
  //   })(i);
  // }

  /* ------------------- 循环给小点注册点击事件-方法2； 更推荐 ------------------ */
  for (let i = 0; i < bannerDots.children.length; i++) {
    bannerDots.children[i].onclick = function () {
      curIndex = i;
      change(curIndex);
    };
  }

  /* ------------------ 注册自动播放事件--鼠标移入和移出 ----------------- */
  banner.onmouseenter = stop;
  banner.onmouseleave = start;
})();
