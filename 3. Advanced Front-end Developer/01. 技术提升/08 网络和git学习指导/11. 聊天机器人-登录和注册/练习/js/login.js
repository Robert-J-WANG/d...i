const loginIdValidator = new InputValidator("#txtLoginId", async function (
  val
) {
  if (!val) {
    return "账号不能为空";
  }
});

const passwordValidator = new InputValidator("#txtLoginPwd", function (val) {
  if (!val) {
    return "密码不能为空";
  }
});

// 给表单注册提交事件
const form = $(".user-form");
form.onsubmit = async (e) => {
  // 阻止表单的默认行为-提交时刷新页面
  e.preventDefault();
  const result = await InputValidator.validateAll(
    loginIdValidator,
    passwordValidator
  );
  if (!result) return; // 验证未通过
  // 收集表单数据的方法new FormData(form)
  const formData = new FormData(form);
  const dataObj = Object.fromEntries(formData.entries());
  const resp = await API.login(dataObj);
  if (resp.code === 0) {
    alert("登录成功,点击确定，跳转到首页");
    location.href = "./index.html";
  } else {
    loginIdValidator.p.innerText = "登录失败,请检查账号和密码";
    passwordValidator.input.value = "";
  }
};
