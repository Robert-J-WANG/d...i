import { DATE } from "sequelize";
import { sequelize } from "./models/sync";
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
} from "./servers/student";

async function main() {
  /* ------------- 1. 模型同步 ------------ */
  /*  await sequelize.sync({ alter: true });
  console.log("model sync done"); */
  /* ---------------- . --------------- */
  /* ---------------- . --------------- */
  /* ---------- 2. 添加student数据 ---------- */
  await studentAdd({
    name: "good student",
    dob: "2019-09-07",
    sex: true,
    mobile: "021-2302123",
    ClassId: 3,
  });
  /* --------- 3. 删除student实例数据 --------- */
  // await studentDelete(541);
  /* --------- 4. 修改student实例数据 --------- */
  // await studentUpdate(544, { mobile: "022-3456553" });

  /* ---------- 5. 查询学生 - 全部 ---------- */
  // await getStudentsAll();

  /* --------- 6. 查询学生 - 按页查询 --------- */
  // await getStudents(2, 5);

  /* ---------- 7. 查询学生 - 按性别 --------- */
  // await getStudentsBySex(5, 5, false);

  /* --------- 8. 查询学生 - 按页查询 + 总数 --------- */
  // await getStudentsByPage(5, 5);

  /* ---- 9. 模糊查询 - name like "arr" --- */
  // await getStudetsLike(1, 5, "arr");

  /* ----------- 10. 查询特定属性 ----------- */
  // await getStudentsAttr(2, 3, ["name", "dob", "sex"]);

  /* -------- 11. 查询学生 - 包含班级信息 ------- */
  // await getStudentsInclude(2, 5);
}

main();
