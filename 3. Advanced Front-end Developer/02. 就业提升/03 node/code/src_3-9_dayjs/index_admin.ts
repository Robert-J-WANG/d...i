import { sequelize } from "./models/sync";
import {
  adminAdd,
  adminDelete,
  adminUpdate,
  getAdminByID,
  login,
} from "./servers/admin";

async function main() {
  /* ------------- 1. 模型同步 ------------ */
  /* await sequelize.sync({ alter: true });
  console.log("model sync done"); */
  /* ---------------- . --------------- */
  /* ---------------- . --------------- */
  /* ---------- 2. 添加admin数据 ---------- */
  /*   await adminAdd({
    loginID: "admin2",
    loginPwd: "MYpwd123!",
    name: "admin2",
  });
 */
  /* --------- 3. 删除admin实例数据 --------- */
  // await adminDelete(4);

  /* --------- 4. 修改admin实例数据 --------- */
  // await adminUpdate(35, { loginPwd: "000000" });

  /* ----- 5. 查询数据 findOne - 登录验证 ----- */
  await login("admin2", "000000");

  /* ------- 6. 查询数据 - findByPK ------- */
  // await getAdminByID(11);
}

main();
