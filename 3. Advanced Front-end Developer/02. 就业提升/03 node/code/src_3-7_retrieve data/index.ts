import { sequelize } from "./models/sync";
import { bookAdd, bookDelete, bookUpdate } from "./servers/book";

async function main() {
  /* ------------- 1. 模型同步 ------------ */
  /*  await sequelize.sync({ alter: true });
  console.log("model sync done"); */
  /* ---------------- . --------------- */
  /* ---------------- . --------------- */
  /* ---------- 2. 添加book数据 ---------- */
  /*   await bookAdd({
    name: "asdas",
    imgUrl: "fasdfasfasdfasdf",
    publishDate: "2020-11-11",
    author: "Hoff",
  }); */
  /* --------- 3. 删除book实例数据 --------- */
  // await bookDelete(2);
  /* --------- 4. 修改book实例数据 --------- */
  // await bookUpdate(1, { name: "new book" });
}

main();
