import express from "express";
import { login } from "../servers/admin";
import { encrypt } from "../utils/crypt";

declare module "express-session" {
  interface SessionData {
    loginUser?: any;
  }
}

/* ------------- 创建路由实例 ------------- */
const router = express.Router();

/* -------------- 定义路由表 ------------- */

/**
 * admin 登录
 */
router.post("/login", async (req, res) => {
  const data = await login(req.body?.loginID, req.body?.loginPwd);
  if (data) {
    // let value = data.id?.toString() as string;
    // // 加密
    // value = encrypt(value);
    // /* ----- 适合浏览器 - 通过cookie给于token ---- */
    // res.cookie("token", value, {
    //   path: "/",
    //   domain: "localhost",
    //   maxAge: 365 * 24 * 60 * 60 * 1000, // 毫秒
    //   // secure: true,
    //   httpOnly: true,
    //   // signed: true, // 开启加密
    // });
    // /* ---- 适合其他客户端 - 通过header给于token --- */
    // res.setHeader("authorization", value);

    /* --------- 登录成功后，响应session -------- */
    //保存信息到session
    req.session.loginUser = data;
  }

  res.send({
    code: 0,
    data,
  });
});

export { router as adminRouter };
