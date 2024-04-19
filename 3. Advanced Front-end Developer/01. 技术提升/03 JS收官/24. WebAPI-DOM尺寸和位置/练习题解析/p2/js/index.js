// 让小球向右下运动，遇到边缘后反弹
var container = document.querySelector(".container");
var initBall = document.querySelector(".ball");

// 获取小球的宽高
var ballWidth = initBall.getBoundingClientRect().width,
  ballHeight = initBall.getBoundingClientRect().height;
// 获取屏幕的宽高，便签的宽高
var sWidth = document.documentElement.clientWidth,
  sHeight = document.documentElement.clientHeight;
// 小球能移动的最大宽高
var disMaxWidth = sWidth - ballWidth,
  disMaxHeight = sHeight - ballHeight;
// 每次移动的步长;
var speedX = 3,
  speedY = 3;
// 调用函数，移动小球
moveBall(initBall, speedX, speedY);

function moveBall(ball, speedX, speedY) {
  setInterval(function () {
    var ballX = ball.getBoundingClientRect().left;
    var ballY = ball.getBoundingClientRect().top;
    var x = ballX + speedX;
    var y = ballY + speedY;

    if (x < 0 || x > disMaxWidth) {
      speedX = -speedX;
      ball.style.backgroundColor = getRandomColor();
      createBall();
    }
    if (y < 0 || y > disMaxHeight) {
      speedY = -speedY;
      ball.style.backgroundColor = getRandomColor();
      createBall();
    }
    ball.style.left = x + "px";
    ball.style.top = y + "px";
  }, 50);
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomNonZero(min, max) {
  let randomNum = 0;
  while (randomNum === 0) {
    randomNum = getRandom(min, max);
  }
  return randomNum;
}

function getRandomColor() {
  var r = getRandom(0, 256);
  var g = getRandom(0, 256);
  var b = getRandom(0, 256);
  var a = 0.7;
  return "rgb(" + r + "," + g + "," + b + "," + a + ")";
}

function createBall() {
  var randomR = getRandomNonZero(-30, 30);
  if (document.querySelectorAll(".ball").length > 200) return;
  var newBall = document.createElement("div");
  newBall.className = "ball";
  newBall.style.backgroundColor = getRandomColor();
  newBall.style.width = ballWidth + randomR + "px";
  newBall.style.height = ballHeight + randomR + "px";
  container.appendChild(newBall);

  var speedX = getRandomNonZero(-6, 6),
    speedY = getRandomNonZero(-6, 6);
  moveBall(newBall, speedX, speedY);
}
