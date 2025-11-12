import path from "path";
import fs from "fs";

const filename = path.resolve(__dirname, "./myFiles/file.txt");
const ws = fs.createWriteStream(filename, {
  encoding: "utf-8",
  start: 0,
  highWaterMark: 5,
});

let i = 0;
// 一直写，知道到达上限，或无法再直接写入
function write() {
  let flag = true;
  while (i < 1024 * 1024 * 10 && flag) {
    flag = ws.write("a"); // 写入a,得到下一次还能不能直接写的flag
    i++;
  }
}
write();

ws.on("drain", () => {
  write(); // 管道清空了，继续写入
});

// let flag = ws.write("a");
// console.log(flag);
// flag = ws.write("b");
// console.log(flag);
// flag = ws.write("c");
// console.log(flag);
// flag = ws.write("d");
// console.log(flag);
// flag = ws.write("e");
// console.log(flag);
// flag = ws.write("f");
// console.log(flag);
