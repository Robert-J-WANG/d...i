/* ----------------------- 编程思维训练 ----------------------- */
/* 
任何网页效果，本质上就做2件事：
1. 一开始做什么？--初始化
  网页一打开，什么都不要动。此时网页需要做什么？显示什么？

2. 用户操作之后，要做什么？--交互
  用户可以点哪里？点了之后，网页要需要做什么？ 
*/

(function () {
  // 获取dom
  var li = document.querySelector(".list");
  var duration = 2000; //每隔多久滚动一次？
  var curIndex = 0; // 滚动到顶部的当前列表
  var itemHeight = 30; // 每一项的高度

  /* ------------------- 1. 一开始做什么？--初始化 ------------------ */
  // 初始化函数
  function init() {
    // 1. 将列表中的第一个元素，克隆到列表的最后，来实现无限轮播的结构
    cloneFirstItem(li);
    // 2.滚动：每个一段时间，将列表滚到下一个位置
    setInterval(moveToNextPosition, duration);
  }
  init();

  /* ----------------- 2. 用户操作之后，要做什么？--交互 ---------------- */
  // 这个案例没有交互

  /**
   * clone node by its firstChild node and append it to the end
   * @param {*} node
   */
  function cloneFirstItem(node) {
    node.appendChild(node.children[0]?.cloneNode(true));
  }

  /**
   * 滚动列表内容到下一个位置
   */
  function moveToNextPosition() {
    var from = curIndex * itemHeight; // 开始的滚动高度
    curIndex++;
    var to = curIndex * itemHeight; // 下一个位置的滚动高度
    // 让list的scrollTop慢慢从from变为to
    // 慢慢变为：在一段时间内，每隔一小段时间，变化一点
    animation(from, to);
    if (curIndex === li.children.length - 1) {
      curIndex = 0;
      from = 0;
    }
  }

  /**
   * 动画：将一个值变化到另一个值
   * @param {*} from 需要变化的值
   * @param {*} to  变化到的目标值
   */
  function animation(from, to) {
    var totalInterval = 600; //总时间
    var interval = 30; //每次变化的间隔时间
    var times = totalInterval / interval; // 变化的次数
    var dis = (to - from) / times; // 每次变化多少

    var timer = setInterval(() => {
      from += dis;
      // 如果变到to之后，停止计时
      if (from >= to) clearInterval(timer);
      li.scrollTop = from;
    }, interval);
  }
})();
