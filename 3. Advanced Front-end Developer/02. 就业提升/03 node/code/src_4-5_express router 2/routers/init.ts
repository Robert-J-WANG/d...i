import express from "express";
import { studentRouter } from "./studentRouter";
import { errorMiddleWare } from "./errorMiddleWare";

/* ---------- 创建一个express应用 --------- */
const app = express();

/* ------ 内置中间件 - urlencoded() ------ */
app.use(
  express.urlencoded({
    extended: true, // 解析 application/x-www-form-urlencoded 类型的请求体，支持嵌套对象
  })
);

/* ---------- 内置中间件 - json ---------- */
app.use(express.json()); // 解析 application/json 类型的请求体

/* -------- 路由实例 - studentRouter ------- */
app.use("/student", studentRouter);

/* -------------- 错误中间件 ------------- */
/* ----------- 必须放在所以中间之后 ----------- */
app.use(errorMiddleWare);

/* -------------- 监听端口 -------------- */
const port = 5003;
app.listen(port, () => {
  console.log(`server is listened on ${port}`);
});
