// 全选框注册点击事件
const JqueryObjs = {
  checkAlls: $(".checkAll"),
  checkItems: $(".checkItem"),
  checkBoxes: $("[type=checkbox]"),
};
const { checkAlls, checkItems, checkBoxes } = JqueryObjs;

/* ----------------------- 全选按钮勾选 ----------------------- */
checkAlls.change(function () {
  const checked = $(this).prop("checked");
  const checkBoxesNotThis = checkBoxes.not($(this));
  checkBoxesNotThis.each((index, item) => {
    $(item).prop({
      checked,
    });
  });
});
/* ----------------------- 单选框勾选 ---------------------- */
checkItems.change(function () {
  // 获取选中的单选框数组
  const checkeds = $.grep(checkItems, (item) => {
    return $(item).prop("checked");
  });
  console.log(checkeds);
  // 设置全选框状态
  checkAlls.each((index, item) =>
    $(item).prop({
      checked: checkeds.length === checkItems.length || false,
    })
  );
});
