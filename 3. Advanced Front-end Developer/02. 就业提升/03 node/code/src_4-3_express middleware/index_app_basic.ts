import express from "express";

/* ---------- 1. 创建一个express应用 --------- */
const app = express(); // app实际是一个函数 - 处理请求的函数

/* -------------- 3. 处理请求 -------------- */
app.get("/test/:id", (req, res) => {
  // req 和 res 是被封装过的对象，不需要使用流去操作

  /* ------------- 获取请求信息 ------------- */
  console.log("请求头:", req.headers);
  console.log("请求路径:", req.path);
  console.log("请求参数:", req.query);

  console.log("动态路径:", req.params);

  /* -------------- 处理相应 -------------- */

  /* ------------- 自定义响应头 ------------- */
  // res.setHeader("a", "1");

  /* -------------- 发送消息体 ------------- */
  // 1. 字符串
  // res.send("<h1>hello express</h1>");

  // 2. 数组
  // res.send([1, 2, 3]);

  // 3. 对象
  /*  res.send({
    name: "Gorge",
    age: 18,
    sex: "male",
  }); */

  // 4. 重定向
  // res.status(302).setHeader("location", "https://expressjs.com/").end();

  // 5. 重定向 - 简洁
  res.redirect(302, "https://expressjs.com/");
});

/* -------------- 2. 监听端口 -------------- */
const port = 5003;
app.listen(port, () => {
  console.log(`server is listened on ${port}`);
});
