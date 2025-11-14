import http from "http";
import url from "url";

function handleReq(req) {
  const pathObj = url.parse(req.url!);
  console.log("请求路径", pathObj);
  console.log("请求方法", req.method);
  console.log("请求头", req.headers);

  let reqBody = "";
  req.on("data", (chunck) => {
    reqBody += chunck.toString("utf-8");
  });
  req.on("end", () => {
    console.log("请求体", reqBody);
  });
}

function handlerRes(res) {
  res.setHeader("a", 1);
  res.setHeader("b", 1);
  res.statusCode = 404;

  res.write("hello");
  res.end();
}

const server = http.createServer((req, res) => {
  // 请求数据获取
  handleReq(req);

  // 响应体对象设置
  handlerRes(res);
});

server.listen(9530);
server.on("listening", () => {
  console.log("server is listening on 9530");
});
