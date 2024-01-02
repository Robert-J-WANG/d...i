// 让小球向右下运动，遇到边缘后反弹

var ball = document.querySelector(".ball");

var ballWidth = ball.getBoundingClientRect().width;
var ballHeight = ball.getBoundingClientRect().height;
// 获取屏幕的宽高，便签的宽高
var sWidth = document.documentElement.clientWidth,
  sHeight = document.documentElement.clientHeight;
var speedX = 3;
var speedY = 3;

setInterval(function () {
  var ballX = ball.getBoundingClientRect().left;
  var ballY = ball.getBoundingClientRect().top;
  var x = ballX + speedX;
  var y = ballY + speedY;
  if (x < 0 || x > sWidth - ballWidth) {
    speedX = -speedX;
    ball.style.backgroundColor = getRandomColor();
  }
  if (y < 0 || y > sHeight - ballHeight) {
    speedY = -speedY;
    ball.style.backgroundColor = getRandomColor();
  }

  ball.style.left = x + "px";
  ball.style.top = y + "px";
}, 20);

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
function getRandomColor() {
  var r = getRandom(0, 256);
  var g = getRandom(0, 256);
  var b = getRandom(0, 256);
  return "rgb(" + r + "," + g + "," + b + ")";
}
