/* -------------------- 所有全选框批量注册change事件 ------------------- */
$(".checkAll").change(function () {
  // 1.批量设置除了当前选框之前的其他选框的选中状态
  $(":checkbox").not($(this)).prop("checked", $(this).prop("checked"));
  // 2. 汇总总计数据
  setTotal();
});
/* ----------------- 所有的多选框批量注册change事件 ----------------- */
$(".checkItem").change(function () {
  // 1. 设置全选框状态：
  setCheckAll();
  // 2.重新汇总总计数据
  setTotal();
});

/* ---------------------- 增数 ---------------------- */
$(".incr").click(function () {
  const iptDom = $(this).prevAll("input");
  const iptValue = +iptDom.val();
  // 增加数量
  iptDom.val(iptValue + 1);
  // 计算总格
  calcPrice($(this));
});
/* ---------------------- 减数 ---------------------- */
$(".decr").click(function () {
  const iptDom = $(this).nextAll("input");
  const iptValue = +iptDom.val();
  // 减少数量
  iptDom.val(iptValue > 1 ? iptValue - 1 : 1);
  // 计算总格
  calcPrice($(this));
});
/* ------------------------- 删除某一个item ------------------------- */
$(".del").click(function () {
  $(this).parents(".item").remove();
  // 重新汇总总计数据
  setTotal();
  // 设置全选框状态
  setCheckAll();
});

/* ---------------------- 删除所选的item --------------------- */
$(".delChecked").click(function () {
  $(".checkItem:checked").parents(".item").remove();
  // 重新汇总总计数据
  setTotal();
  // 设置全选框状态
  setCheckAll();
});
/* ------------------------ 清空购物车 ----------------------- */
$(".clearAll").click(function () {
  $(".item").remove();
  // 重新汇总总计数据
  setTotal();
  // 设置全选框状态
  setCheckAll();
});
/* --------------------- 所以a标签阻止默认行为 -------------------- */
$("a").click(function (e) {
  e.preventDefault();
});
/**
 * 汇总总计数据
 */
function setTotal() {
  const checkedItems = $(".checkItem:checked");
  // 计算总价
  let totalPrice = 0;
  // 获取选中的多选框
  checkedItems.each((index, item) => {
    totalPrice += +$(item)
      .parents(".item")
      .find(".sum em")
      .text()
      .replace("￥", "");
  });
  // console.log(totalPrice);
  // 设置总数和总价
  $(".footer .right .nums em").text(checkedItems.length);
  $(".footer .right .sums em").text(`￥ ${totalPrice.toFixed(2)}`);
}

/**
 * 设置全选框状态
 */
function setCheckAll() {
  $(".checkAll").prop(
    "checked",
    $(".checkItem:checked").length === $(".checkItem").length &&
      $(".checkItem:checked").length !== 0
      ? true
      : false
  );
}

/**
 * 计算单个item的总价
 */
function calcPrice(clickedItem) {
  const unitPrice = +clickedItem
    .parents(".item")
    .find(".price em")
    .text()
    .replace("￥", "");
  const num = +clickedItem.parents(".item").find(".num input").val();
  clickedItem
    .parents(".item")
    .find(".sum em")
    .text(`￥${(unitPrice * num).toFixed(2)}`);
  setTotal();
}
