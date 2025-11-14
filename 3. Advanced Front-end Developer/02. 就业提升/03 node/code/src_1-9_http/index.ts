// 静态资源服务器

// http://localhost:9527/index.html -> public/index.html
// http://localhost:9527/css/index.css -> public/css/index.css

import http from "http";
import URL from "url";
import path from "path";
import fs from "fs";

const getStat = async (filename) => {
  try {
    return await fs.promises.stat(filename);
  } catch {
    return null;
  }
};

const getFileInfo = async (url) => {
  const urlObj = URL.parse(url);
  // 文件资源的绝对路径
  let filename = path.resolve(
    __dirname,
    "public",
    urlObj.pathname!.substring(1)
  );
  let stat = await getStat(filename);
  if (!stat) {
    // 文件不存在
    return null;
  } else if (stat.isDirectory()) {
    // 文件是目录
    filename = path.resolve(__dirname, "public", filename, "index.html");
    stat = await getStat(filename);

    // 目录里没有此文件
    if (!stat) {
      return null;
    } else {
      // 目录里有此文件
      console.log(filename);
      return await fs.promises.readFile(filename);
    }
  } else {
    // 正常文件
    return await fs.promises.readFile(filename);
  }
};

const handleServer = async (
  req: http.IncomingMessage,
  res: http.ServerResponse
) => {
  const fileInfo = await getFileInfo(req.url);
  if (!fileInfo) {
    res.statusCode = 404;
    res.write("not found");
  } else {
    res.write(fileInfo);
  }

  res.end();
};

const server = http.createServer(handleServer);

server.listen(9527);
server.on("listening", () => {
  console.log("server is runing on port 9527");
});
