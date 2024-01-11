/* ------------------------ 1.初始化 ----------------------- */
// 获取dom
var imgs = $(".imgs");
var sideBar = $(".side-bar-content");

var timerId = null;
var interval = 2000;
var curIndex = 0;

init();
function init() {
  createImg();
  createNav();
  setActive(curIndex);
  startMove();
}

/* ------------------------ 2.交互 ------------------------ */
for (let i = 0; i < data.length; i++) {
  sideBar.children[i].onmouseenter = function () {
    curIndex = i;
    setActive(curIndex);
    stopMove();
  };
  sideBar.children[i].onmouseleave = function () {
    startMove();
  };
}

function createImg() {
  for (var i = 0; i < data.length; i++) {
    var a = document.createElement("a");
    a.setAttribute("href", "#");
    a.style.backgroundImage = "url(" + data[i].img + ")";
    a.style.borderBlockColor = data[i].bg;
    imgs.appendChild(a);
  }
}
function createNav() {
  for (var i = 0; i < data.length; i++) {
    var a = document.createElement("a");
    a.setAttribute("href", "#");
    a.className = "nav";
    a.setAttribute("title", data[i].title + data[i].desc);
    a.innerHTML = "<span>" + data[i].title + "</span>" + data[i].desc;
    sideBar.appendChild(a);
  }
}

function setActive(curIndex) {
  for (var i = 0; i < data.length; i++) {
    imgs.children[i].style.display = "none";
    sideBar.children[i].className = "nav";
  }
  imgs.children[curIndex].style.display = "block";
  sideBar.children[curIndex].className = "active";
}

function startMove() {
  timerId = setInterval(() => {
    curIndex++;
    if (curIndex > data.length - 1) {
      curIndex = 0;
    }
    setActive(curIndex);
  }, interval);
}
function stopMove() {
  clearInterval(timerId);
}

function $(selector) {
  return document.querySelector(selector);
}
