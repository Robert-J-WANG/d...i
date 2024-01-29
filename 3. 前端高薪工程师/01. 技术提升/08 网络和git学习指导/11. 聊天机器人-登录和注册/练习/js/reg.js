const loginIdValidator = new InputValidator("#txtLoginId", async function (
  val
) {
  if (!val) {
    return "账号不能为空";
  }
  const resp = await API.exists(val);
  if (resp.data) {
    return "该账户已经存在，请重新输入";
  }
  if (resp.code === 400) {
    return "用户名不能超过20个字符，请重新输入";
  }
});

const nicknameValidator = new InputValidator("#txtNickname", function (val) {
  if (!val) {
    return "昵称不能为空";
  }
});

const passwordValidator = new InputValidator("#txtLoginPwd", function (val) {
  if (!val) {
    return "密码不能为空";
  }
});

const pwdConfirmValidator = new InputValidator("#txtLoginPwdConfirm", function (
  val
) {
  if (!val) {
    return "验证密码不能为空";
  }
  if (val !== passwordValidator.input.value) {
    return "验证密码错误，请重新输入";
  }
});

// 给表单注册提交事件
const form = $(".user-form");
form.onsubmit = async (e) => {
  // 阻止表单的默认行为-提交时刷新页面
  e.preventDefault();
  const result = await InputValidator.validateAll(
    loginIdValidator,
    nicknameValidator,
    passwordValidator,
    pwdConfirmValidator
  );
  if (!result) return; // 验证未通过
  // 收集表单数据的方法new FormData(form)
  const formData = new FormData(form);
  /* formData.entries(); // 收集所以键值对的迭代器 [['loginId', 'sdfa'],['nickname', 'afsdf'],['loginPwd', '123']]
   */
  // 再将迭代器还原成对象-Object.fromEntries()
  const dataObj = Object.fromEntries(formData.entries());
  // console.log(dataObj);

  // const resp = await API.reg({
  //   loginId: loginIdValidator.input.value,
  //   nickname: nicknameValidator.input.value,
  //   loginPwd: passwordValidator.input.value,
  // });
  const resp = await API.reg(dataObj);
  if (resp.code === 0) {
    alert("注册成功,点击确定，跳转到登录页");
    location.href = "./login.html";
  }
};
