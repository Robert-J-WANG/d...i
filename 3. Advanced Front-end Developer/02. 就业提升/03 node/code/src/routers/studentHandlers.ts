import { Request, Response } from "express";
import {
  studentAdd,
  studentDelete,
  studentUpdate,
  getStudentsByPage,
} from "../servers/student";

/* ----------------- handler 封装 ----------------- */

// 分页查询学生
const getStudents = async (req: Request, res: Response) => {
  const page = req.query?.page || 1;
  const limit = req.query?.limit || 10;
  const data = await getStudentsByPage(+page, +limit);
  res.send({ code: 0, data });
};

// 添加学生
const addStudent = async (req: Request, res: Response) => {
  const data = await studentAdd(req.body);
  res.send(data);
};

// 修改学生
const updateStudent = async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await studentUpdate(id, req.body);
  res.send(result);
};

// 删除学生
const deleteStudent = async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await studentDelete(id);
  res.send(result);
};

export { getStudents, addStudent, updateStudent, deleteStudent };
