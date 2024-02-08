// 全选框注册点击事件
const JqueryObjs = {
  checkAlls: $(".checkAll"), // 所有的全选框
  checkItems: $(".checkItem"), // 所以的单选框
  // checkBoxes: $("[type=checkbox]"),
  checkBoxes: $(":checkbox"), // 所以的选中框（包括全选和单选框）
  nums: $(".nums"),
  sums: $(".sums"),
  items: $(".item"),
  delCheckedBtn: $(".delChecked"),
  clearAll: $(".clearAll"),
};
const {
  checkAlls,
  checkItems,
  checkBoxes,
  nums,
  sums,
  items,
  delCheckedBtn,
  clearAll,
} = JqueryObjs;

/* -------------------- 批量给全选按钮注册勾选事件 ------------------- */
checkAlls.change(function () {
  // 当前全选框的选中状态
  const thisChecked = $(this).prop("checked");
  // 除去当前全选框以外的所以勾选框
  const checkBoxesNotThis = checkBoxes.not($(this));
  // console.log(checkBoxesNotThis);
  // checkBoxesNotThis.each((index, item) => {
  //   $(item).prop({
  //     checked,
  //   });
  // });
  // 批量设置选中状态
  checkBoxesNotThis.prop({
    checked: thisChecked,
  });
  setPrice();
});
/* ----------------------- 单选框勾选 ---------------------- */
checkItems.change(function () {
  const checkeds = getCheckedItens();
  setPrice();
  // 设置全选框状态
  // checkAlls.each((index, item) =>
  //   $(item).prop({
  //     checked: checkeds.length === checkItems.length || false,
  //   })
  // );
  checkAlls.prop({
    checked: checkeds.length === checkItems.length || false,
  });
});

/**
 *
 * @returns 返回选择的多选框，但不包含全选框
 */
function getCheckedItens() {
  // 获取选中的单选框数组
  // return checkItems.filter(":checked");
  return $(":checked:not(.checkAll)");
}

/**
 * 设置汇总价格信息
 */
// function setPrice() {
//   // 获取所有选中的多选框
//   const checkeds = getCheckedItens();
//   // 获取每个item的价格
//   const prices = checkeds.map((index, item) => {
//     const sumPrice = $(item).parents(".item").children(".sum");
//     const itemPrice = $(sumPrice).children("em").text().slice(1);
//     return itemPrice;
//   });
//   const pricesArr = Array.from(prices);
//   const totalNum = pricesArr.filter((item) => item !== "").length;
//   // 设置总价
//   const totalPrice = pricesArr.reduce((a, b) => a + +b, 0);
//   nums.children("em").text(totalNum);
//   sums.children("em").text(`￥${totalPrice.toFixed(2)}`);
// }

function setPrice() {
  // 获取所有选中的多选框
  const checkeds = getCheckedItens();
  // 获取每个item的价格
  let prices = 0;
  checkeds.each((index, item) => {
    prices += +$(item)
      .parents(".item")
      .find(".sum em")
      .text()
      .replace("￥", "");
  });
  // 设置总价
  $(".footer .right .nums em").text(checkeds.length);
  $(".footer .right .sums em").text(`￥${prices.toFixed(2)}`);
}

/* ---------------------- 增减删按钮注册事件 --------------------- */
items.each(function (index, item) {
  const num = $(item).children(".num");
  const incrBtn = $(num).children(".incr");
  const decrBtn = $(num).children(".decr");
  const numValue = $(num).children("input");
  const unitPrice = $(item).children(".price");
  const sumPrice = $(item).children(".sum");
  const deleteDiv = $(item).children(".del");
  const deleteBtn = $(deleteDiv).children("a");

  incrBtn.click((e) => {
    e.preventDefault();
    incrNum(numValue);
    calcPrice(unitPrice, numValue, sumPrice);
    setPrice();
  });

  decrBtn.click((e) => {
    e.preventDefault();
    decrNum(numValue);
    calcPrice(unitPrice, numValue, sumPrice);
    setPrice();
  });

  deleteBtn.click((e) => {
    e.preventDefault();
    $(item).empty();
    setPrice();
  });
});

delCheckedBtn.click((e) => {
  e.preventDefault();
  const checkeds = getCheckedItens();
  const checkedItems = checkeds.map((index, item) => $(item).parents(".item"));
  checkedItems.each((index, item) => item.empty());
  setPrice();
});

function incrNum(numValue) {
  numValue.val(function () {
    return +this.value + 1;
  });
}

function decrNum(numValue) {
  if (+numValue.prop("value") <= 1) {
    numValue.val("1");
  } else {
    numValue.val(function () {
      return +this.value - 1;
    });
  }
}

function calcPrice(unitPrice, numValue, sumPrice) {
  const number = +numValue.prop("value");
  const unitPriceValue = +$(unitPrice).children("em").text().slice(1);
  $(sumPrice)
    .children("em")
    .text(`￥${(number * unitPriceValue).toFixed(2)}`);
}
function deleteItem() {}
