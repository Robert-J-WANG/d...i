// (function () {

// 一开始做什么？--初始化
// 1. 将列表中的第一个元素，克隆到列表的最后，来实现无限轮播的结构
// 获取dom
var li = document.querySelector(".list");
li.appendChild(li.children[0].cloneNode(true));
dis = 30;
setInterval(function () {
  li.scrollTop += dis;
  console.log(li.scrollTop);
  if (li.scrollTop === 120) {
    li.scrollTop = 0;
  }
}, 1000);

var timer = setTimeout(function () {}, 300);

// })();

/* ----------------------- 编程思维训练 ----------------------- */
/* 
任何网页效果，本质上就做2件事：
1. 一开始做什么？--初始化
  网页一打开，什么都不要动。此时网页需要做什么？显示什么？

2. 用户操作之后，要做什么？--交互
  用户可以点哪里？点了之后，网页要需要做什么？ 
*/
