import { Book } from "../models/sync";

interface IBook {
  name: string;
  imgUrl: string;
  publishDate: string;
  author: string;
}

/* -------------- 增加数据 -------------- */
const bookAdd = async (obj: IBook) => {
  const inst = Book.create(obj);
  const res = inst ? (await inst).toJSON() : null;
  console.log("add done");
  console.log(res);
  return res;
};

/* -------------- 删除数据 -------------- */
const bookDelete = async (id: number) => {
  const res = await Book.destroy({
    where: {
      id,
    },
  });
  console.log("delete done");
  console.log(res);
};

/* -------------- 修改数据 -------------- */
const bookUpdate = async (id: number, newObj) => {
  const res = await Book.update(newObj, {
    where: {
      id,
    },
  });
  console.log(res);
  console.log("update done");
};

/* ------------- 分页查询书籍 ------------- */
const getBooksByPage = async (page = 1, limit = 10) => {
  const res = await Book.findAndCountAll({
    offset: (page - 1) * limit,
    limit,
  });
  const data = {
    total: res.count,
    books: JSON.parse(JSON.stringify(res.rows)),
  };
  console.log(data);
  return data;
};

export { bookAdd, bookDelete, bookUpdate, getBooksByPage };
