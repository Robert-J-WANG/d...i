import fs from "fs";
import path from "path";

// 获取绝对路径
const dirpath = path.resolve(__dirname, "./myFiles");

const exists = async (path) => {
  try {
    await fs.promises.stat(path);
    return true;
  } catch (err) {
    // console.log(err);
    if (err.code === "ENOENT") {
      // 文件不存在
      return false;
    }
    throw err;
  }
};

const test = async (path) => {
  const res = await exists(path);
  if (res) {
    // dir 存在，不做任何操作
    console.log(" dir already exists");
  } else {
    // dir不存在，创建
    await fs.promises.mkdir(path);
    console.log("create dir done");
  }
};

test(dirpath);
