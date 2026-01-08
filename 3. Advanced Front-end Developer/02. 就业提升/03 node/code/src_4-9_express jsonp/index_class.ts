import { DATE } from "sequelize";
import { sequelize } from "./models/sync";
import {
  classAdd,
  classDelete,
  classUpdate,
  getClassAll,
} from "./servers/class";

async function main() {
  /* ---------- 2. 添加class数据 ---------- */
  /*   await classAdd({
    name: "ahahas",
    openDate: "2020-11-11",
  }); */
  /* --------- 3. 删除class实例数据 --------- */
  // await classDelete(41);
  /* --------- 4. 修改class实例数据 --------- */
  // await classUpdate(41, { name: "jj", openDate: "2025-11-11" });

  /* ------------ 5. 查询全部班级 ----------- */
  await getClassAll();
}

main();
