import express from "express";
import { errorMiddleWare } from "./errorMiddleWare";

/* ---------- 创建一个express应用 --------- */
const app = express();

/* ------------ 1. 常规中间件 ------------ */
/* app.get(
  "/",
  (req, res, next) => {
    console.log("中间件 1");
    next();
  },
  (req, res, next) => {
    console.log("中间件 2");
    next();
  },
  (req, res, next) => {
    console.log("中间件 3");
    next();
  },
  (req, res) => {
    res.send("响应结束");
  }
); */

/* ----------- 2. 错误处理中间件 ----------- */

app.get(
  "/",
  (req, res, next) => {
    console.log("中间件 1");
    next();
  },
  (req, res, next) => {
    console.log("中间件 2 - 抛出错误");
    // 重点: 调用 next(err) 来跳过常规中间件并跳转到错误处理中间件
    next(new Error("这是一个测试错误"));
    // next();
  },
  (req, res, next) => {
    // 这个中间件将被跳过
    console.log("中间件 3");
    next();
  },
  (req, res) => {
    res.send("响应结束");
  }
);

app.use("/", (err, req, res, next) => {
  errorMiddleWare(err, req, res, next);
});

/* -------------- 监听端口 -------------- */
const port = 5003;
app.listen(port, () => {
  console.log(`server is listened on ${port}`);
});
