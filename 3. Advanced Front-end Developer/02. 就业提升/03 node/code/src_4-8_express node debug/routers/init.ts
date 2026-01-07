import express from "express";
import cookieParser from "cookie-parser";
import { studentRouter } from "./student";
import { adminRouter } from "./admin";
import { errorMiddleWare } from "./errorMiddleWare";
import { tokenMiddleWare } from "./tokenMiddleWare";

/* ---------- 创建一个express应用 --------- */
const app = express();

/* ----------- 使用cookie中间件 ---------- */
app.use(cookieParser("haha")); // 可配置加密密钥

/* --- 使用token解析中间件 - 解析cookie，并验证 -- */
app.use(tokenMiddleWare);

/* ------ 内置中间件 - urlencoded() ------ */
app.use(
  express.urlencoded({
    extended: true, // 解析 application/x-www-form-urlencoded 类型的请求体，支持嵌套对象
  })
);

/* ---------- 内置中间件 - json ---------- */
app.use(express.json()); // 解析 application/json 类型的请求体

/* -------- 路由实例 - studentRouter ------- */
app.use("/api/student", studentRouter);

/* -------- 路由实例 - adminRouter ------- */
app.use("/api/admin", adminRouter);

/* --- 使用token解析中间件 - 解析cookie，并验证 -- */
app.use(tokenMiddleWare);

/* -------------- 错误中间件 ------------- */
/* ----------- 必须放在所以中间之后 ----------- */
app.use(errorMiddleWare);

/* -------------- 监听端口 -------------- */
const port = 5003;
app.listen(port, () => {
  console.log(`server is listened on ${port}`);
});
