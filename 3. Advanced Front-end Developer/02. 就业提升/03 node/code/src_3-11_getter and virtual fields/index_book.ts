import { DATE } from "sequelize";
import { sequelize } from "./models/sync";
import {
  bookAdd,
  bookDelete,
  bookUpdate,
  getBooksByPage,
} from "./servers/book";

async function main() {
  /* ---------- 2. 添加book数据 ---------- */
  /*   await bookAdd({
    name: "Diddly Squat: The Farmer's Dog",
    imgUrl:
      "https://www.whitcoulls.co.nz/content/products/7003226_MAIN.jpg?enable=upscale&canvas=2:3&auto=webp&optimize=high&width=1160",
    publishDate: "28/10/2025",
    author: "Jeremy Clarkson",
  }); */
  /* --------- 3. 删除book实例数据 --------- */
  // await bookDelete(81);
  /* --------- 4. 修改book实例数据 --------- */
  // await bookUpdate(81, { name: "heihei", publishDate: "28 October 2022" });

  /* ------------ // 分页查询书 ------------ */
  await getBooksByPage(2, 5);
}

main();
