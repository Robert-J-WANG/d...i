import express from "express";

/* ---------- 创建一个express应用 --------- */
const app = express();

/* -------------- 内置中间件 ------------- */
/* -------- express.urlencoded() -------- */
app.use(
  express.urlencoded({
    extend: true, // 解析 application/x-www-form-urlencoded 类型的请求体，支持嵌套对象
  })
);

app.post("/api/student", (req, res) => {
  console.log(req.body); //{ name: 'Allex', age: 18 }
});

/* -------------- 监听端口 -------------- */
const port = 5003;
app.listen(port, () => {
  console.log(`server is listened on ${port}`);
});
