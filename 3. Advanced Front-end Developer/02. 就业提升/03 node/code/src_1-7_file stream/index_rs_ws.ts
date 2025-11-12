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
method_1();

// 方式 2 - 文件读写流的方式
function method_2() {
  const from = path.resolve(__dirname, "./myFiles/file.txt");
  const to = path.resolve(__dirname, "./myFiles/file_copy.txt");
  // 创建文件读取流
  const rs = fs.createReadStream(from);
  // 创建文件写入流
  const ws = fs.createWriteStream(to);
  console.time("method 2");
  // 读取文件
  rs.on("data", (chunk) => {
    // 读取到一部分数据，开始写
    let flag = ws.write(chunk);

    if (!flag) {
      // 表示下次写入会造成被压, 读取暂停
      rs.pause();
    }
  });

  // 写入通道清空了，触发
  ws.on("drain", () => {
    // 继续读取
    rs.resume();
  });

  // 写入完成
  rs.on("close", () => {
    // 关闭写入流
    ws.end();
    console.timeEnd("method 2");
    console.log("copy down");
  });
}

method_2();
