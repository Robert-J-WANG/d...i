import { Class } from "../models/sync";

interface Iclass {
  name: string;
  openDate: string;
}

/* -------------- 增加数据 -------------- */
const classAdd = async (obj: Iclass) => {
  const inst = Class.create(obj);
  const res = inst ? (await inst).toJSON() : null;
  console.log("add done");
  console.log(res);
  return res;
};

/* -------------- 删除数据 -------------- */
const classDelete = async (id) => {
  const res = await Class.destroy({
    where: {
      id,
    },
  });
  console.log("delete done");
  console.log(res);
};

/* -------------- 修改数据 -------------- */
const classUpdate = async (id, newObj) => {
  const res = await Class.update(newObj, {
    where: {
      id,
    },
  });
  console.log(res);
  console.log("update done");
};

/* ------------- 查询所有班级 ------------- */
const getClassAll = async () => {
  const res = await Class.findAndCountAll();
  const data = {
    total: res.count,
    classes: JSON.parse(JSON.stringify(res.rows)),
  };
  console.log(data);
  return data;
};

export { classAdd, classDelete, classUpdate, getClassAll };
