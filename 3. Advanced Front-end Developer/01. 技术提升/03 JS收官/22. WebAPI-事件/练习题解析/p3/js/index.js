// 输入待办事项，按下回车后，添加事项到列表
$(".txt").addEventListener("keydown", function (e) {
  if (!this.value.trim()) return;
  if (e.key === "Enter") {
    var li = document.createElement("li");
    var span = document.createElement("span");
    var button = document.createElement("button");
    li.appendChild(span);
    li.appendChild(button);
    span.innerText = this.value;
    button.innerText = "删除";
    $(".todo-list").appendChild(li);
    this.value = "";

    // 点击删除后，删除对应的待办事项
    button.addEventListener("click", function () {
      li.remove();
    });
  }
});
// 点击删除后，删除对应的待办事项

/**
 *
 * @param {*} selector  选择器名称
 * @returns  选中的dom对象
 */
function $(selector) {
  return document.querySelector(selector);
}
