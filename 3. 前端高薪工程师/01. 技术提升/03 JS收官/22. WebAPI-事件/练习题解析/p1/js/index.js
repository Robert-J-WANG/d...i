/**
 * 根据协议的多选框是否选中设置注册按钮状态
 */
function setSubmitButtonStatus() {
  $("button[type=submit]").disabled = !$(".policy input").checked;
}

/**
 * 根据手机号文本框中的文本，设置发送验证码按钮的状态
 */
function setSendCodeButtonStatus() {
  $(".captcha button").disabled = $("#txtPhone").value.length !== 11;
}

/**
 * 根据当前选中的爱好，设置已选择爱好文本
 */
function setSelectedLoves() {
  var valus = [];
  var options = $("select").children;
  for (var i = 0; i < options.length; i++) {
    if (options[i].selected) {
      valus.push(options[i].innerText);
    }
  }
  $("#selChoose").innerText = "已选择的爱好：" + valus.join(",");
}

/**
 *
 * @param {*} selector  选择器名称
 * @returns  选中的dom对象
 */
function $(selector) {
  return document.querySelector(selector);
}

// 页面加载时，先调用函数
setSubmitButtonStatus();
setSendCodeButtonStatus();
setSelectedLoves();

// 将上面的函数和用户事件连接
$(".policy input").addEventListener("click", setSubmitButtonStatus);
$("#txtPhone").addEventListener("input", setSendCodeButtonStatus);
$("select").addEventListener("change", setSelectedLoves);

// 给所有的文本框注册事件，若用户在输入的过程中按下了ESC，则将文本框清空
var inputs = document.querySelectorAll(".txt");

for (var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("keydown", function (e) {
    // console.log(e);
    if (e.key === "Escape") {
      this.value = "";
    }
  });
}
