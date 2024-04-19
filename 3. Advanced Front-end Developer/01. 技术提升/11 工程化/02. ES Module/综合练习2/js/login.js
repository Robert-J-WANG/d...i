import { userLogin } from "./api/user.js";
import * as doms from "./doms.js";

let isLogining = false; // 标识是否正在登录状态

export default async function () {
  if (isLogining) return; // 如果在登录，return
  isLogining = true;
  doms.btnSubmit.value = "正在登录中...";

  // 1.获取用户表单数据
  const loginId = doms.userName.value;
  const loginPwd = doms.userPassword.value;
  // 2. 做一些简单的验证
  if (!loginId) {
    alert("请填写账号");
    return;
  }
  if (!loginPwd) {
    alert("请填写密码");
    return;
  }
  // 3. 请求api
  const result = await userLogin(loginId, loginPwd);
  if (result) {
    alert(`登录成功, ${result.nickname}欢迎你`);
  } else {
    alert(`登录失败`);
  }
  // 重置登录状态
  isLogining = false;
  doms.btnSubmit.value = "登录";
  doms.userName.value = "";
  doms.userPassword.value = "";
}
