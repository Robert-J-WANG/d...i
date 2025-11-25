import { Admin } from "../models/sync";

const adminAdd = async (adminObj) => {
  /* ------ 方式1- 先构建一个模型实例，再保存实例 ---------------- */
  /*   const inst = Admin.build(adminObj);
  await inst.save();
  console.log(inst.toJSON());
  console.log("add data done"); */

  /* ---------------------- 方式2- 一键生成 --------------------- */
  const inst = await Admin.create(adminObj);
  console.log(inst.toJSON());
  console.log("add data done");
};

const adminDelete = async (adminID) => {
  /* ---------- 方式1 - 通过实例删除 ---------- */
  /*  // 1. 找到实例
  const inst = await Admin.findByPk(adminID);
  // 2. 删除实例
  if (inst) {
    const result = await inst.destroy();
    console.log(result); // 返回的结果是被删除的实例对象
    console.log("delete done");
  } */

  /* ---------- 方式2 - 直接通过模型删除 ---------- */
  const result = await Admin.destroy({
    where: {
      id: adminID,
    },
  });
  console.log(result); // 返回的结果是影响的行数
};

const adminUpdate = async (adminID, adminObj) => {
  /* ------------ 方式1- 通过实例 ----------- */
  /*  // 1. 找到实例
  const inst = await Admin.findByPk(adminID);
  // console.log(inst);
  if (inst) {
    inst.name = adminObj.name;
    const result = await inst.save();
    console.log(result);
    console.log("update done");
  } */
  /* ------------ 2.通过模型修改 ------------ */
  await Admin.update(adminObj, {
    where: {
      id: adminID,
    },
  });
  console.log("update done");
};

export { adminAdd, adminDelete, adminUpdate };
