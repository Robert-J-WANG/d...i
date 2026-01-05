import express from "express";
import { login } from "../servers/admin";

/* ------------- 创建路由实例 ------------- */
const router = express.Router();

/* -------------- 定义路由表 ------------- */

/**
 * admin 登录
 */
router.post("/login", async (req, res) => {
  const data = await login(req.body?.loginID, req.body?.loginPwd);
  if (data) {
    //登录成功
    res.header(
      "set-cookie",
      `token=${data.id}; path=/; domain=localhost; Max-age=1000; secure=true; httponly=true`
    );
  }

  res.send({
    code: 0,
    data,
  });
});

export { router as adminRouter };
