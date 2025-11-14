import http from "http";

// 创建请求
const request = http.request(
  "http://www.baidu.com/",
  { method: "GET" },
  (resp) => {
    console.log(resp);
    console.log("响应状态码", resp.statusCode);
    console.log("响应消息", resp.statusMessage);
    console.log("响应头", resp.headers);
    console.log("响应头类型", resp.headers["content-type"]);

    // 获取响应体
    let respBody = "";
    resp.on("data", (chunk) => {
      respBody += chunk.toString("utf8");
    });
    resp.on("end", () => {
      console.log(respBody);
    });
  }
);

// console.log(request);
request.write("Hellodd");
request.end();
