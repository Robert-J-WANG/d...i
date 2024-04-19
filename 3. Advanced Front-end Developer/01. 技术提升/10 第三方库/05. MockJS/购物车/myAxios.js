const myAxios = axios.create({
  // 配置统一的根路径
  baseURL: "https://mock",
});

// 添加响应拦截器
myAxios.interceptors.response.use(
  function (resp) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return resp.data.data; // 仅得到响应体中的data属性
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    alert(error.message); // 弹出错误消息
  }
);
