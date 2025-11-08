import fs from "fs";
import path from "path";

// 获取文件的绝对路径
const filepath = path.resolve(__dirname, "./myFiles/file.txt");

// 读取文件的内容

// 格式1：
fs.readFile(filepath, (err, content) => {
  console.log(content); // 读取的是Buffer格式
  console.log(content.toString()); // 转换为字符串
});

// 格式2：
fs.readFile(filepath, "utf-8", (err, content) => {
  console.log(content);
});

// 格式3：
fs.readFile(
  filepath,
  {
    encoding: "utf-8",
  },
  (err, content) => {
    console.log(content);
  }
);

fs.promises.readFile(filepath, "utf-8").then((content) => {
  console.log(content);
});

async function newReadFile() {
  const res = await fs.promises.readFile(filepath, "utf-8");
  console.log(res);
}
newReadFile();
