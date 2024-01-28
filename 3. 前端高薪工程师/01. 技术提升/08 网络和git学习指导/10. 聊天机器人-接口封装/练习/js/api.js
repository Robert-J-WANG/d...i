const BASE_URL = "https://study.duyiedu.com";
// 注册
async function reg(userInfo) {
  const res = await fetch(`${BASE_URL}/api/user/reg`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });
  console.log(typeof res); // 拿到了相应头部分
}
// reg({loginId:"bbbjiers",nickname:"bbbjiers",loginPwd:"123123"});
// 登录resp.json());
function login(loginInfo) {}
// 验证用户是否存在
function exists(loginId) {}
// 获取当前用户信息
function profile() {}
// 发送聊天信息
function sendChat(content) {}
// 获取聊天记录
function getHistory() {}
