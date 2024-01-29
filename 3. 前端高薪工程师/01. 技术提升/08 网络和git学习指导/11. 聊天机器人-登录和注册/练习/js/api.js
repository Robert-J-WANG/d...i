const API = (function () {
  const BASE_URL = "https://study.duyiedu.com";
  const TOKEN_KEY = "token";
  const REG_PATH = "/api/user/reg";
  const LOGIN_PATH = "/api/user/login";
  const EXISTS_PATH = "/api/user/exists?loginId=";
  const PROFILE_PATH = "/api/user/profile";
  const CHAT_PATH = "/api/chat";
  const HISTORY_PATH = "/api/chat/history";

  // 封装get和put方法 (获取包含响应头的promise对象)
  function get(path) {
    const headers = { "Content-Type": "application/json" };
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }
    return fetch(BASE_URL + path, { headers });
  }

  function post(path, postObj) {
    const headers = { "Content-Type": "application/json" };
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }
    return fetch(BASE_URL + path, {
      method: "POST",
      headers,
      body: JSON.stringify(postObj),
    });
  }
  /* ------------------------- 注册 ------------------------- */
  // async function reg(userInfo) {
  //   const res = await fetch(`${BASE_URL}/api/user/reg`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(userInfo),
  //   }); // 拿到了响应头
  //   const body = await res.json(); // 拿到了响应体
  //   return body;
  // }

  async function reg(userInfo) {
    const res = await post(REG_PATH, userInfo);
    return await res.json();
  }

  // reg({loginId:"bbbbjiers",nickname:"bbbbjiers",loginPwd:"123123"});

  /* ------------------------ 登录 ----------------------- */
  // async function login(loginInfo) {
  //   const res = await fetch(`${BASE_URL}/api/user/login`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(loginInfo),
  //   }); // 拿到了响应头
  //   const body = await res.json(); // 拿到了响应体
  //   // 一旦登录成功
  //   if (body.code === 0) {
  //     // 将token令牌保存到本地存储
  //     const token = res.headers.get("authorization");
  //     localStorage.setItem(TOKEN_KEY, token);
  //   }
  //   return body;
  // }
  async function login(loginInfo) {
    const res = await post(LOGIN_PATH, loginInfo);
    const body = await res.json(); // 拿到了响应体

    if (body.code === 0) {
      // 一旦登录成功
      // 将token令牌保存到本地存储
      const token = res.headers.get("authorization");
      localStorage.setItem(TOKEN_KEY, token);
    }
    return body;
  }

  // login({ loginId: "bbbbjiers", loginPwd: "123123" });
  /* ---------------------- 验证用户是否存在 ---------------------- */
  async function exists(loginId) {
    const res = await get(EXISTS_PATH + loginId);
    return await res.json();
  }

  /* ---------------------- 获取当前用户信息 ---------------------- */
  async function profile() {
    const res = await get(PROFILE_PATH);
    return res.json();
  }
  /* ----------------------- 发送聊天信息 ----------------------- */
  async function sendChat(content) {
    const res = await post(CHAT_PATH, { content });
    return await res.json();
  }
  /* ----------------------- 获取聊天记录 ----------------------- */
  async function getHistory() {
    const res = await get(HISTORY_PATH);
    return await res.json();
  }

  /* ----------------------- 注销、退出登录 ---------------------- */
  function logout() {
    localStorage.removeItem(TOKEN_KEY);
  }

  return {
    reg,
    login,
    exists,
    profile,
    sendChat,
    getHistory,
    logout,
  };
})();
