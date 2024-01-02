// 让便签可被拖动，但不能超出视口
// 鼠标按下时，可移动；鼠标抬起时，不能移动
var moveBar = document.querySelector(".move-bar");
var note = document.querySelector(".note");
// 监听moveBar的鼠标按下
moveBar.onmousedown = function (e) {
  // 按下时鼠标的当前坐标
  var mouseCurrentX = e.clientX,
    mouseCurrentY = e.clientY;

  //  按下时鼠标时便签的坐标
  var noteRect = note.getBoundingClientRect();
  // 获取便签当前的left,top
  var noteCurrentLeft = noteRect.left,
    noteCurrentTop = noteRect.top;

  // 获取屏幕的宽高，便签的宽高
  var sWidth = document.documentElement.clientWidth,
    sHeight = document.documentElement.clientHeight;
  var nWidth = noteRect.width,
    nHeight = noteRect.height;

  // 鼠标按下后，监听鼠标在整个屏幕中移动
  window.onmousemove = function (e) {
    // console.log("move");
    // 鼠标移动时，鼠标移动的距离
    var disX = e.clientX - mouseCurrentX;
    var disY = e.clientY - mouseCurrentY;

    // 便签移动后的坐标
    var x = noteCurrentLeft + disX,
      y = noteCurrentTop + disY;

    // 设置边界
    if (x < 0) {
      x = 0;
    }
    if (x > sWidth - nWidth) {
      x = sWidth - nWidth;
    }
    if (y < 0) {
      y = 0;
    }
    if (y > sHeight - nHeight) {
      y = sHeight - nHeight;
    }

    // 移动便签
    note.style.left = x + "px";
    note.style.top = y + "px";
  };

  // 监听整个屏幕的鼠标抬起事件
  window.onmouseup = function () {
    // 鼠标抬起后,不再监听鼠标移动，鼠标抬起
    window.onmousemove = null;
    window.onmouseup = null;
  };
};
