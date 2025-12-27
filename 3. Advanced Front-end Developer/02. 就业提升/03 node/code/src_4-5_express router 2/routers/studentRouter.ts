import express from "express";
import {
  studentAdd,
  studentDelete,
  studentUpdate,
  getStudentsAll,
  getStudents,
  getStudentsBySex,
  getStudentsByPage,
  getStudetsLike,
  getStudentsAttr,
  getStudentsInclude,
} from "../servers/student";

/* ------------- 创建路由实例 ------------- */
const router = express.Router();

/* -------------- 定义路由表 ------------- */

/**
 * 分页查询学生
 */
router.get("/", async (req, res) => {
  console.log("分页查询");
  const page = req.query?.page || 1;
  const limit = req.query?.limit || 10;
  const data = await getStudentsByPage(+page, +limit);
  res.send({
    code: 0,
    data,
  });
});
// 添加学生
router.post("/", async (req, res) => {
  const stdObj = req.body;
  const data = await studentAdd(stdObj);
  res.send(data);
});

// 修改学生
router.put("/:id", async (req, res) => {
  const id = req.params.id;

  const stdObj = req.body;
  if (stdObj.dob) {
    stdObj.dob = new Date(stdObj.dob);
  }
  const result = await studentUpdate(id, stdObj);
  res.send(result);
});

// 删除学生
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await studentDelete(id);
  res.send(result);
});

// 测试error中间件
router.get("/__test_error", async (req, res) => {
  throw new Error("EXPRESS 5 ASYNC TEST");
});

export { router as studentRouter };
