// 全选框注册点击事件
const JqueryObjs = {
  checkAlls: $(".checkAll"),
  checkItems: $(".checkItem"),
  checkBoxes: $("[type=checkbox]"),
  nums: $(".nums"),
  sums: $(".sums"),
};
const { checkAlls, checkItems, checkBoxes, nums, sums } = JqueryObjs;

/* ----------------------- 全选按钮勾选 ----------------------- */
checkAlls.change(function () {
  const checked = $(this).prop("checked");
  const checkBoxesNotThis = checkBoxes.not($(this));
  checkBoxesNotThis.each((index, item) => {
    $(item).prop({
      checked,
    });
  });
  setPrice();
});
/* ----------------------- 单选框勾选 ---------------------- */
checkItems.change(function () {
  const checkeds = getCheckedItens();
  setPrice();
  // 设置全选框状态
  checkAlls.each((index, item) =>
    $(item).prop({
      checked: checkeds.length === checkItems.length || false,
    })
  );
});
/* ---------------------- 计算商品数量和价格 --------------------- */
function getCheckedItens() {
  // 获取选中的单选框数组
  return $.grep(checkItems, (item) => $(item).prop("checked"));
}
function setPrice() {
  const checkeds = getCheckedItens();
  const totalNum = checkeds.length;
  // 设置每个item的价格
  const prices = checkeds.map((item) => {
    const priceDiv = $(item).parents(".item").children(".price");
    const unitPrice = $(priceDiv).children("em").text().replace("￥", "");
    const numDiv = priceDiv.next();
    const number = $(numDiv).children("input").val();
    const itemPrice = (+unitPrice * number).toFixed(2);
    const sumDiv = numDiv.next();
    sumDiv.children("em").text(`￥${itemPrice}`);
    return itemPrice;
  });

  // 设置总价
  const totalPrice = prices.reduce((a, b) => a + +b, 0);
  // const totalPrice = checkeds.reduce((item) => {});
  console.log(totalNum, totalPrice);
  nums.children("em").text(totalNum);
  sums.children("em").text(`￥${totalPrice.toFixed(2)}`);
}
