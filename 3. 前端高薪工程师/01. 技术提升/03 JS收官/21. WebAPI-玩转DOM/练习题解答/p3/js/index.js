/**
 * 根据协议的多选框是否选中设置注册按钮状态
 */
function setSubmitButtonStatus() {
  $("button[type=submit]").disabled = !$(".policy input").checked;
}
setSubmitButtonStatus();

/**
 * 根据手机号文本框中的文本，设置发送验证码按钮的状态
 */
function setSendCodeButtonStatus() {
  $(".captcha button").disabled = !($("#textMobile").value.length === 11);
}
setSendCodeButtonStatus();

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
  $("#hobby").innerText = "已选择的爱好：" + valus.join(",");
}
setSelectedLoves();

/**
 *
 * @param {*} selector  选择器名称
 * @returns  选中的dom对象
 */
function $(selector) {
  return document.querySelector(selector);
}
