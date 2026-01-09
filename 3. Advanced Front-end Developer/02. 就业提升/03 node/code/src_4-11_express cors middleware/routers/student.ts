import express from "express";
import * as studentHandlers from "./studentHandlers";
import { Irouter } from "./routerType";

/* ------------- 创建路由实例 ------------- */
const router = express.Router();

/* -------------- 定义路由表 ------------- */

export const studentRouters: Irouter[] = [
  {
    method: "GET",
    path: "/",
    handler: studentHandlers.getStudents,
    authRequired: true,
  },
  {
    method: "POST",
    path: "/",
    handler: studentHandlers.addStudent,
    authRequired: true,
  },
  {
    method: "PUT",
    path: "/:id",
    handler: studentHandlers.updateStudent,
    authRequired: true,
  },
  {
    method: "DELETE",
    path: "/:id",
    handler: studentHandlers.deleteStudent,
    authRequired: true,
  },
];

/* ------------ 动态注册全部路由 ------------ */
studentRouters.forEach((route) => {
  router[route.method.toLowerCase()](route.path, route.handler);
});

// 测试error中间件
router.get("/__test_error", async (req, res) => {
  throw new Error("EXPRESS 5 ASYNC TEST");
});

export { router as studentRouter };
