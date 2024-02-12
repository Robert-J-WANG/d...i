// 创建axios实例
const axiosInstance = axios.create({
  baseURL: "https://study.duyiedu.com/",
});
// 添加请求拦截器
axiosInstance.interceptors.request.use(function (config) {
  // config 为当前的请求配置
  // 在发送请求之前做些什么
  // 这里，我们添加一个请求头
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.authorization = "Bearer " + token;
  }
  return config; // 返回处理后的配置
});

// 添加响应拦截器
axiosInstance.interceptors.response.use(
  function (resp) {
    // console.log(resp);
    // 保存token到本地-用于验证当前用户是否已登录
    const token = resp.headers.authorization;
    if (token) {
      localStorage.setItem("token", token);
    }

    // 2xx 范围内的状态码都会触发该函数。
    if (resp.data.code !== 0) {
      alert(resp.data.msg);
    }

    // 对响应数据做点什么
    return resp.data.data; // 仅得到响应体中的data属性
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    alert(error.message); // 弹出错误消息
  }
);
