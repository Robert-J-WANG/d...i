// 初始化
// 封装一个插件，输入必要信息，能生成翻页功能
// 必要信息：1. 当前页，2.总页数，3. 最多显示多少页，4. 插件放到那个容器
var container = document.querySelector(".pagercontainer");
var options = {
  curPage: 1, // 当前选择第一页
  totalPage: 50, // 总共50页
  maxPage: 10, // 最多显示10页
  container: container, //翻页器放在哪里
};

createPageDiv(options);

/**
 * 生成一个页面翻页器
 * @param {object} options 配置对象
 * @param {number} curPage： 当前选择页
 * @param {number} totalPage： 总共页数
 * @param {number} maxPage： 最多显示页
 * @param {object} container： 翻页器放在哪里
 */
function createPageDiv(options) {
  var curPage = options.curPage;
  var maxPage = options.maxPage;
  var totalPage = options.totalPage;
  var container = options.container;
  /**
   * 创建一个anchor元素的内部函数
   * @param {string} className ：不同的类名：正常”“， 当前选择的active, 不能点击的 disabled
   * @param {string} text ： 页码值
   * @param {number} nextPage ：点击跳转到哪里
   */
  // 创建a标签的父容器
  var pageDiv = document.createElement("div");
  pageDiv.className = "pager";

  function _createAnchor(className, text, nextPage) {
    var a = document.createElement("a");
    a.className = className;
    a.innerText = text;
    pageDiv.appendChild(a);
    // 交互
    a.onclick = function () {
      // 清空原先的div
      container.innerHTML = "";
      //   创建新的div
      options.curPage = nextPage;
      createPageDiv(options);
      // 其他逻辑功能
    };
  }

  //   根据curPage的不同，创建不同样式的a容器
  //   1. 创建首页和上一页
  if (curPage === 1) {
    _createAnchor("disabled", "首页", 1);
    _createAnchor("disabled", "上一页", 1);
  } else {
    _createAnchor("", "首页", 1);
    _createAnchor("", "上一页", curPage - 1);
  }
  //   2.创建中间页面
  //   计算起始值和结束值
  var start =
    curPage <= maxPage / 2
      ? 1
      : curPage > totalPage - maxPage / 2
      ? totalPage - maxPage + 1
      : curPage - Math.floor(maxPage / 2);
  var end = start + maxPage - 1;
  for (var i = start; i <= end; i++) {
    if (i === curPage) {
      _createAnchor("active", i, i);
    } else {
      _createAnchor("", i, i);
    }
  }

  //   3. 创建尾页和下一页
  if (curPage === totalPage) {
    _createAnchor("disabled", "尾页", totalPage);
    _createAnchor("disabled", "下一页", totalPage);
  } else {
    _createAnchor("", "尾页", totalPage);
    _createAnchor("", "下一页", curPage + 1);
  }

  // 4.当前页码
  var span = document.createElement("span");
  span.innerText = curPage + "/" + totalPage;
  pageDiv.appendChild(span);
  container.appendChild(pageDiv);
}
