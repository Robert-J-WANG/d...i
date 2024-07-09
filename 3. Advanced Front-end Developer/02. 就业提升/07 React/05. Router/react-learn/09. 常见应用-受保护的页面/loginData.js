// 登录授权验证信息，暂且保存到一个全局对象
export default {
  isLogin: false,
  login() {
    this.isLogin = true;
  },
  logout() {
    this.isLogin = false;
  },
};
