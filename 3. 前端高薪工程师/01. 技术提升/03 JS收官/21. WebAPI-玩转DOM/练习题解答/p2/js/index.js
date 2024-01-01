// 每隔一段时间，切换英雄的图片，让英雄动起来

var img = document.querySelector("img");
var index = 1;
setInterval(function () {
  img.src = "./img/" + index + ".png";
  index++;
  if (index === 4) {
    index = 1;
  }
}, 500);
// 每隔一段时间，改变英雄的位置，让英雄向右移动

img.style.position = "fixed";
img.style.top = "0";
img.style.left = "0";

var speedX = 2;
setInterval(function () {
  img.style.left = speedX + "px";
  speedX += 2;
}, 300);
