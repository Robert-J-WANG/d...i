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
  /* await adminAdd({
    loginID: "fasfd111",
    loginPwd: "123456",
    name: "asdas",
  }); */

  /* --------- 3. 删除admin实例数据 --------- */
  // await adminDelete(4);

  /* --------- 4. 修改admin实例数据 --------- */
  // await adminUpdate(7, { name: "new name" });

  /* ----- 5. 查询数据 findOne - 登录验证 ----- */
  /*   const result = await login(
    "9be48b88-1537-46d0-b5b8-67a1d3c5fcc4",
    "pTAZOxz1mMBlVR0"
  );
  console.log(result); */

  /* ------- 6. 查询数据 - findByPK ------- */
  await getAdminByID(11);
}

main();
