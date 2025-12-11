import { Class, Student } from "../models/sync";
import { Op } from "sequelize";

import { studentSchema, Istudent } from "../schemas/schema";
import dayjs from "dayjs";

/* interface Istudent {
  name: string;
  dob: string | Date;
  sex: boolean;
  mobile: string;
  ClassId?: number;
} */

/* -------------- 增加数据 -------------- */
const studentAdd = async (obj: Istudent) => {
  const valResult = studentSchema.safeParse(obj);
  if (valResult.success) {
    const inst = Student.create(obj);
    const res = inst ? (await inst).toJSON() : null;
    console.log("add done");
    console.log(res);
    return res;
  } else {
    console.log(valResult.error.issues.map((e) => e.message));
  }
};

/* -------------- 删除数据 -------------- */
const studentDelete = async (id) => {
  const res = await Student.destroy({
    where: {
      id,
    },
  });
  console.log("delete done");
  console.log(res);
};

/* -------------- 修改数据 -------------- */
const studentUpdate = async (id, newObj) => {
  const valResult = studentSchema.partial().safeParse(newObj);
  if (valResult.success) {
    const res = await Student.update(newObj, {
      where: {
        id,
      },
    });
    console.log(res);
    console.log("update done");
  } else {
    console.log(valResult.error.issues.map((e) => e.message));
  }
};

/* ---------- 查询数据 -findAll --------- */
/* ------------- 1. 查询全部 ------------ */
const getStudentsAll = async () => {
  const res = await Student.findAll();
  const students = res ? JSON.parse(JSON.stringify(res)) : null;
  console.log(students);
  console.log("retrive done");
};
/* --------- 2. 查询部分 - 分页数据 --------- */
const getStudents = async (page = 1, limit = 10) => {
  const res = await Student.findAll({
    offset: (page - 1) * limit, // 跳过多少条数据
    limit, // 每页显示多少条数据
  });
  const students = res ? JSON.parse(JSON.stringify(res)) : null;
  console.log(students);
  console.log("retrive done");
};

/* --------- 3. 按条件查询 - 女同学 --------- */
const getStudentsBySex = async (page = 1, limit = 10, sex: boolean = false) => {
  const res = await Student.findAll({
    offset: (page - 1) * limit, // 跳过多少条数据
    limit, // 每页显示多少条数据
    where: {
      sex, // 按性别查询
    },
  });

  const students = res ? JSON.parse(JSON.stringify(res)) : null;

  // 获取总数
  const total = await Student.count({
    where: { sex },
  });
  const data = {
    total,
    page,
    students,
  };
  console.log(data);
  console.log("retrive done");
  return data;
};

/* ------------- 4. 分页查询+总数 ------------ */

const getStudentsByPage = async (page = 1, limit = 10) => {
  const res = await Student.findAndCountAll({
    offset: (page - 1) * limit,
    limit,
  });

  const data = {
    total: res.count,
    students: JSON.parse(JSON.stringify(res.rows)),
  };
  console.log(data);
  return data;
};

/* ------------- 5. 模糊查询 ------------ */

const getStudetsLike = async (page = 1, limit = 10, keyword) => {
  const res = await Student.findAndCountAll({
    offset: (page - 1) * limit,
    limit,
    where: {
      name: {
        [Op.like]: `%${keyword}%`,
      },
    },
  });
  const data = {
    total: res.count,
    students: JSON.parse(JSON.stringify(res.rows)),
  };
  console.log(data);
  return data;
};

/* ------ 6. 查询特定属性  - attributes ------ */
/**
 *
 * @param page 当前页数
 * @param limit 每页显示的数量
 * @param atrrs 需要查询的特点属性的数组
 * @returns
 */
const getStudentsAttr = async (page = 1, limit = 10, atrrs) => {
  const res = await Student.findAndCountAll({
    attributes: atrrs,
    offset: (page - 1) * limit,
    limit,
  });
  const data = {
    total: res.count,
    students: JSON.parse(JSON.stringify(res.rows)),
  };
  console.log(data);
  return data;
};

/* -------- 7. 包含关系 - include ------- */
const getStudentsInclude = async (page = 1, limit = 10) => {
  const res = await Student.findAndCountAll({
    offset: (page - 1) * limit,
    limit,
    include: [Class],
  });
  const data = {
    total: res.count,
    students: JSON.parse(JSON.stringify(res.rows)),
  };
  console.log(data);
  return data;
};

export {
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
};
