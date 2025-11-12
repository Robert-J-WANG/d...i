import path from "path";
import fs from "fs";

// 方式 1 - 普通文件读写
async function method_1() {
  const from = path.resolve(__dirname, "./myFiles/file.txt");
  const to = path.resolve(__dirname, "./myFiles/file_copy.txt");
  console.time("method 1");
  const content = await fs.promises.readFile(from);
  await fs.promises.writeFile(to, content);
  console.timeEnd("method 1");
  console.log("copy down");
}
// method_1();

// 方式 2 - 文件读写流的方式
function method_2() {
  const from = path.resolve(__dirname, "./myFiles/file.txt");
  const to = path.resolve(__dirname, "./myFiles/file_copy.txt");

  const rs = fs.createReadStream(from);

  const ws = fs.createWriteStream(to);
  console.time("method 2");

  rs.pipe(ws); // 使用管道方法
  rs.on("close", () => {
    console.timeEnd("method 2");
    console.log("copy down");
  });
}

method_2();
