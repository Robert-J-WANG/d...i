/**
 * 参考接口文档：https://app.apifox.com/project/2429576
 * 完成下面的api函数
 * 并对每个函数进行调用测试
 * 需要统一处理的地方：
 * 1. 对baseurl进行统一处理
 * 2. 当服务器响应结果中的code不为0时，需要使用alert弹出错误消息msg
 * 3. 如果服务器响应头中出现Authorization:token，需要对把响应头中的token保存到localstorage
 * 4. 请求时，如果发现本地localstorage中包含token，需要将其带入到请求头中 Authorization: Bearer token
 */

/**
 * 登录
 * @param {*} loginId 账号
 * @param {*} loginPwd 密码
 * @return 返回登录成功的用户
 */
async function login(loginId, loginPwd) {
  const resp = await axiosInstance.post("api/user/login", {
    loginId,
    loginPwd,
  });
  return resp;
}
// 测试
(async function () {
  const res = await login("bbjer", "123123");
  // const res = login("bbjjeerr", "123123");
  console.log(res);
})();
/**
 * 注册
 * @param {*} loginId 账号
 * @param {*} loginPwd 密码
 * @param {*} nickname 昵称
 */
async function reg(loginId, loginPwd, nickname) {
  const resp = await axiosInstance.post("api/user/reg", {
    loginId,
    loginPwd,
    nickname,
  });
  return resp;
}

// 测试
(async function () {
  // const res =await reg("bbjer", "123123", "bbjer");
  const res = await reg("bbjer4", "123123", "bbjer4");
  console.log(res);
})();

/**
 * 验证账号是否存在
 * @param {*} loginId 账号
 */
async function exists(loginId) {
  const resp = await axiosInstance.get("api/user/exists", {
    params: {
      loginId,
    },
  });
  return resp;
}
// 测试
(async function () {
  const res = await exists("bbjer");
  // const res = await exists("bbjjeerr");
  console.log(res);
})();

/**
 * 恢复登录，获取当前登录的用户信息
 */
async function profile() {
  const resp = await axiosInstance.get("api/user/profile");
  return resp;
}
// 测试
(async function () {
  const res = await profile();
  console.log(res);
})();
