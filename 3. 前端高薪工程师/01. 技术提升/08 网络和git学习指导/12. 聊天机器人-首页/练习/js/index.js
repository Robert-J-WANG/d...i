(async function () {
  //  验证用户是否登录
  const resp = await API.profile();
  const userObj = resp.data;
  // console.log(userObj);
  if (!userObj) {
    // 未登录
    alert("请先登录");
    location.href = "./login.html";
    return;
  }
  // 如果已经登录
  // 获取dom
  const doms = {
    aside: {
      nickname: $(".aside-name"),
      loginId: $(".aside-account"),
    },
    chatContainer: $(".chat-container"),
    closeButton: $(".close"),
    msgContainer: $(".msg-container"),
    msgText: $("#txtMsg"),
  };
  /* ------------------------ 初始化页面 ----------------------- */

  init();
  /* ------------------------- 交互 ------------------------- */
  // 退出、注销
  doms.closeButton.onclick = () => {
    API.logOut();
    location.href = "./login.html";
  };
  // 发送聊天消息
  doms.msgContainer.onsubmit = async (e) => {
    e.preventDefault();
    const content = doms.msgText.value.trim();
    // 如果内容为空
    if (!content) return;
    // 内容不为空
    // 发送聊天
    addOneChat({
      content,
      createdAt: Date.now(),
      from: userObj.loginId,
      to: null,
    });

    scrollBottom();
    doms.msgText.value = "";
    const resp = await API.sendChat(content);
    const msg = resp.data;
    // 渲染机器人回复消息
    addOneChat({
      ...msg,
    });
    // 设置滚动条到最底部
    scrollBottom();
  };

  async function init() {
    // 渲染侧边栏用户信息
    setUserInfo();
    // 渲染聊天记录
    getChatHistory();
  }

  function setUserInfo() {
    const { loginId, nickname } = userObj;
    doms.aside.loginId.innerText = loginId;
    doms.aside.nickname.innerText = nickname;
  }
  async function getChatHistory() {
    const resp = await API.getHistory();
    const chatObjs = resp.data;
    chatObjs.map((item) => addOneChat(item));

    // 设置滚动条到最底部
    scrollBottom();
  }

  // 让聊天区域的滚动条滚动到底
  function scrollBottom() {
    doms.chatContainer.scrollTop = doms.chatContainer.scrollHeight;
  }

  function addOneChat(chatObj) {
    const { from, content, createdAt } = chatObj;
    const div = $$$("div");
    div.className = `${from ? "chat-item me" : "chat-item"}`;
    div.innerHTML = `
    <img class="chat-avatar" src=${
      from ? "./asset/avatar.png" : "./asset/robot-avatar.jpg"
    } />
    <div class="chat-content">${content}</div>
    <div class="chat-date">${formatDate(createdAt)}</div>
    `;

    doms.chatContainer.appendChild(div);
  }
})();
