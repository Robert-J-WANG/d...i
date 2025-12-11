import express from "express";
import path from "path";

/* ---------- 创建一个express应用 --------- */
const app = express();

/* -------------- 内置中间件 ------------- */
/* -------- express.json -------- */
app.use(express.json()); // 解析 application/json 类型的请求体

app.post("/api/student", (req, res) => {
  console.log(req.body); //{ name: 'Allex', age: 18 }
});

/* -------------- 监听端口 -------------- */
const port = 5003;
app.listen(port, () => {
  console.log(`server is listened on ${port}`);
});
