import fs from "fs";
import path from "path";

// 获取绝对路径
const dirpath = path.resolve(__dirname, "./myFiles");

/* const test = async (path: string) => {
  const res = await fs.promises.readdir(path);
  console.log(res);
};

test(dirpath); */

const test = async (path: string) => {
  for (let index = 1; index <= 5; index++) {
    await fs.promises.mkdir(dirpath + "/" + index);
  }
  const res = await fs.promises.readdir(path);
  console.log(res);
};

test(dirpath);
