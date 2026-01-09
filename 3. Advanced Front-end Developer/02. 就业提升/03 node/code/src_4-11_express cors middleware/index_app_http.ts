import express from "express";
import http from "http";

/* ---------- 创建一个express应用 --------- */
const app = express(); // app实际是一个函数 - 处理请求的函数

const server = http.createServer(app);

const port = 5001;
server.listen(port, () => {
  console.log(`server is listened on ${port}`);
});
