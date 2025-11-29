import { Book } from "../models/sync";

const bookAdd = async (bookObj) => {
  /* ---------------------- 方式2- 一键生成 --------------------- */
  const inst = await Book.create(bookObj);
  console.log(inst.toJSON());
  console.log("add data done");
};

const bookDelete = async (bookID) => {
  /* ---------- 方式2 - 直接通过模型删除 ---------- */
  const result = await Book.destroy({
    where: {
      id: bookID,
    },
  });
  console.log(result); // 返回的结果是影响的行数
};

const bookUpdate = async (bookID, bookObj) => {
  /* ------------ 方式1- 通过实例 ----------- */
  /*  // 1. 找到实例

  /* ------------ 2.通过模型修改 ------------ */
  await Book.update(bookObj, {
    where: {
      id: bookID,
    },
  });
  console.log("update done");
};

export { bookAdd, bookDelete, bookUpdate };
