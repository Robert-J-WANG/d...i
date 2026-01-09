import express from "express";
import cookieParser from "cookie-parser";
import { studentRouter } from "./student";
import { adminRouter } from "./admin";
import { errorMiddleWare } from "./errorMiddleWare";
import { tokenMiddleWare } from "./tokenMiddleWare";
import path from "path";
import { corsMiddleWare } from "./corsMiddleWare";
import cors from "cors";
import session from "express-session";

/* ---------- 创建一个express应用 --------- */
const app = express();

const allowCorsOrigins = ["http://127.0.0.1:5500", "null"];

var corsOptions = {
  origin: (origin, callback) => {
    // 非浏览器跨域请求（直接访问、Postman、同源）
    if (!origin) {
      return callback(null, true);
    }
    // 同源请求，直接放行
    if (origin === "http://localhost:5003") {
      return callback(null, true);
    }
    // 跨域请求
    if (allowCorsOrigins.includes(origin)) {
      // 在白名单中
      callback(null, true); // error:null, allowCors:true
    } else {
      // 不在白名单
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true, // 运行带身份认证跨域
};

/* -------------- 跨域中间件 ------------- */
// app.use(corsMiddleWare);
app.use(cors(corsOptions));

/* ---------- 使用session中间件 ---------- */
app.use(
  session({
    secret: "hehe", // 加密密钥
    name: "sessionID", // 默认是'connect.sid'.
  })
);

/* ------------- 静态资源中间件 ------------ */
const staticRoot = path.resolve(__dirname, "../public");
// console.log(staticRoot);
app.use("/", express.static(staticRoot));

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

/* -------------- 错误中间件 ------------- */
/* ----------- 必须放在所以中间之后 ----------- */
app.use(errorMiddleWare);

/* -------------- 监听端口 -------------- */
const port = 5003;
app.listen(port, () => {
  console.log(`server is listened on ${port}`);
});
