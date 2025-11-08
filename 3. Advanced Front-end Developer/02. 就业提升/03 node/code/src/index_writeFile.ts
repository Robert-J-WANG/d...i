import fs from "fs";
import path from "path";

// 获取文件的绝对路径
const filepath = path.resolve(__dirname, "./myFiles/file.txt");

/* // 方式1：
fs.writeFile(filepath, "hello world", () => {
  console.log("write file done 1");
});

// 方式2
fs.promises.writeFile(filepath, "hello new world").then(() => {
  console.log("write file done 2");
});

// 方式3
const newWriteFile = async () => {
  await fs.promises.writeFile(filepath, "hello hello");
  console.log("write file done 3");
};
newWriteFile();
 */

// 获取文件的绝对路径
const imgPath = path.resolve(__dirname, "./myFiles/pic.png");

const newImgPath = path.resolve(__dirname, "./myFiles/pic2.png");

const newWriteFile = async () => {
  const buffer = await fs.promises.readFile(imgPath);
  await fs.promises.writeFile(newImgPath, buffer, {
    encoding: "utf-8", // 配置编码方式
    flag: "a", // 配置写入方式 - 追加
  });
  console.log("copy done");
};
newWriteFile();

const test = async (path) => {
  const res = await fs.promises.stat(path);
  console.log(res);
  console.log(res.isFile());
  console.log(res.isDirectory());
};
test(imgPath);
