import net from "net";

const server = net.createServer();

server.listen(9527);

server.on("listening", () => {
  console.log("port is listening");
});

server.on("connection", (socket) => {
  console.log("server is conneted");
  socket.on("data", (chunk) => {
    console.log(chunk.toString("utf8"));
    socket.write(`HTTP/1.1 200 OK

      
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>Hello</h1>
</body>
</html>`);

    socket.end();
  });

  socket.on("end", () => {
    console.log("server is close");
  });
});
