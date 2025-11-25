import { sequelize } from "./models/sync";
import { adminAdd, adminDelete, adminUpdate } from "./servers/admin";

async function main() {
  /* ------------- 1. 模型同步 ------------ */
  /* await sequelize.sync({ alter: true });
  console.log("model sync done"); */
  /* ---------------- . --------------- */
  /* ---------------- . --------------- */
  /* ---------- 2. 添加admin数据 ---------- */
  /* await adminAdd({
    loginID: "fasfd111",
    loginPwd: "123456",
    name: "asdas",
  }); */

  /* --------- 3. 删除admin实例数据 --------- */
  // await adminDelete(4);

  /* --------- 4. 修改admin实例数据 --------- */
  await adminUpdate(7, { name: "new name" });
}

main();
