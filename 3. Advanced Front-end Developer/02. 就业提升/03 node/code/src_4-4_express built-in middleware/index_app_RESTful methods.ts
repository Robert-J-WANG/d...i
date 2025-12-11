import express from "express";

/* ---------- 1. 创建一个express应用 --------- */
const app = express(); // app实际是一个函数 - 处理请求的函数

/* --- Express 的 RESTful API 示例代码 --- */
// 获取用户列表
app.get("/users", (req, res) => {
  res.send("获取所有用户");
});

// 获取某个用户
app.get("/users/:id", (req, res) => {
  res.send(`获取用户：${req.params.id}`);
});

// 创建用户
app.post("/users", (req, res) => {
  res.send("创建用户");
});

// 全量更新用户
app.put("/users/:id", (req, res) => {
  res.send(`全量更新用户：${req.params.id}`);
});

// 部分更新用户
app.patch("/users/:id", (req, res) => {
  res.send(`部分更新用户：${req.params.id}`);
});

// 删除用户
app.delete("/users/:id", (req, res) => {
  res.send(`删除用户：${req.params.id}`);
});

/* -------------- 2. 监听端口 -------------- */
const port = 5003;
app.listen(port, () => {
  console.log(`server is listened on ${port}`);
});
