import express from "express";
import path from "path";

/* ---------- 创建一个express应用 --------- */
const app = express();

/* -------------- 内置中间件 ------------- */
/* -------- express.static -------- */
const staticRoot = path.resolve(__dirname, "../public");
// console.log(staticRoot);
app.use("/", express.static(staticRoot));

app.get("/", (req, res) => {
  res.send("aaaaa"); // 这个中间件不运行
});

/* -------------- 监听端口 -------------- */
const port = 5003;
app.listen(port, () => {
  console.log(`server is listened on ${port}`);
});
