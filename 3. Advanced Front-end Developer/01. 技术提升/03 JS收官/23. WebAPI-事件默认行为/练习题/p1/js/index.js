// 完成表单验证

/**
 *
 * 验证用户名长度：长度3-10位
 * @returns {boolean} 验证成功返回true，验证失败返回false
 */
function validateLoginId() {
  var div = $("#loginId");
  var input = $("#loginId input");
  var p = $("#loginId p");
  var err = "";
  if (!input.value.trim()) {
    err = "用户名不能为空";
  } else if (input.value.length < 3 || input.value.length > 10) {
    err = "密码长度为3-10位";
  }
  p.innerText = err;
  div.className = err ? "form-item err" : "form-item";
  return !err;
}
// validateLoginId();

/**
 *
 * 验证密码长度：长度6-16位
 * @returns {boolean} 验证成功返回true，验证失败返回false
 */
function validatePwd() {
  var div = $("#loginPwd");
  var input = $("#loginPwd input");
  var p = $("#loginPwd p");
  var err = "";
  if (!input.value.trim()) {
    err = "密码不能为空";
  } else if (input.value.length < 6 || input.value.length > 16) {
    err = "密码长度为6-16位";
  }
  p.innerText = err;
  div.className = err ? "form-item err" : "form-item";
  return !err;
}

/**
 * 表单递交
 * @returns {boolean} true or false
 */
function validateForm() {
  var isloginIdValid = validateLoginId();
  var isPwdValid = validatePwd();
  return isloginIdValid && isPwdValid;
}

// 表单注册事件;
$("#loginId input").addEventListener("input", validateLoginId);

$("#loginPwd input").addEventListener("input", validatePwd);
$(".form-container").addEventListener("submit", function (e) {
  if (!validateForm()) {
    e.preventDefault();
  } else {
    alert("登录提交，正在登录...");
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
