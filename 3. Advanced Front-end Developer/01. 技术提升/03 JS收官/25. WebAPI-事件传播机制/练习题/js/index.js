// 输入待办事项，按下回车后，添加事项到列表
$(".txt").addEventListener("keydown", function (e) {
  if (!this.value.trim()) return;
  if (e.key === "Enter") {
    $(".todo-list").innerHTML +=
      " <li><span>" + this.value + "</span><button>删除</button></li>";
    this.value = "";
  }
});
// 使用事件委托的方式完成删除事件
$(".todo-list").addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    e.target.parentElement.remove();
  }
});
/**
 *
 * @param {*} selector  选择器名称
 * @returns  选中的dom对象
 */
function $(selector) {
  return document.querySelector(selector);
}
