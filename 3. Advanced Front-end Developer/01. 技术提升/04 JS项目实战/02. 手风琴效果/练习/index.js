// 初始化：此案例不需要
// 交互：

// 给每个菜单注册点击事件
var title = document.querySelectorAll(".menu h2");
var itemHeight = 30;
var totalMS = 300;

for (var i = 0; i < title.length; i++) {
  title[i].addEventListener("click", function () {
    // console.log(this);

    // 收起其他所有菜单
    var beforeOpened = document.querySelector(".submenu[status=opened]");
    if (beforeOpened) {
      closeMenu(beforeOpened);
    }
    toggleMenu(this.nextElementSibling);
  });
}

// 测试菜单
var testMenu = document.querySelector(".submenu");
// 打开菜单
function openMenu(subMenu) {
  // subMenu的高度从0变化为（itemHeight*subMenu子元素的个数）
  // 自定义状态(opened, closed, playing),用来标记菜单是否打开，或者动画正在播放中

  // 调用封装的动画函数 (只有自定义状态时关闭时才调用动画)
  // 获取自定义状态
  var status = subMenu.getAttribute("status");
  if (status !== "closed" && status) return;
  createAnimation({
    from: 0,
    to: subMenu.children.length * itemHeight,
    totalMS,
    onmove: function (n) {
      subMenu.style.height = n + "px";
      subMenu.setAttribute("status", "playing");
    },
    onend: function () {
      subMenu.setAttribute("status", "opened"); //
    },
  });
}
// 关闭菜单
function closeMenu(subMenu) {
  // subMenu的高度从0变化为（itemHeight*subMenu子元素的个数）
  // 自定义状态(opened, closed, playing),用来标记菜单是否打开，或者动画正在播放中

  // 调用封装的动画函数 (只有自定义状态时关闭时才调用动画)
  // 获取自定义状态
  var status = subMenu.getAttribute("status");
  if (status == "closed") return;
  createAnimation({
    from: subMenu.children.length * itemHeight,
    to: 0,
    totalMS,
    onmove: function (n) {
      subMenu.style.height = n + "px";
      subMenu.setAttribute("status", "playing");
    },
    onend: function () {
      subMenu.setAttribute("status", "closed");
    },
  });
}

// 切换打开关闭菜单函数
function toggleMenu(subMenu) {
  var status = subMenu.getAttribute("status");
  if (status === "playing") {
    // 正在播放动画
    return;
  } else if (status === "opened") {
    closeMenu(subMenu);
  } else {
    openMenu(subMenu);
  }
}
