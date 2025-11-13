import net from "net";

// 创建请求连接
const socket = net.createConnection(
  {
    host: "duyi.ke.qq.com",
    port: 80,
  },
  () => {
    console.log("connection done");
  }
);

// 写入流 - 向服务器发送数据
// socket.write("hello", () => {
//   console.log("send data to the server");
// });

socket.write(
  `GET / HTTP/1.1
  Host: duyi.ke.qq.com
  Connetion:keep-alive

  `,
  () => {
    console.log("send data to the server");
  }
);

// 读取流 - 获取服务器的响应
socket.on("data", (chunk) => {
  console.log("data from server :", chunk.toString("utf8"));
  // 获取数据完成，结束通信
  socket.end();
});

socket.on("close", () => {
  console.log("done");
});
