import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (connection) => {
  console.log("新的使用者已連線");

  connection.on("message", (message) => {
    console.log(`收到新訊息 => ${message}`);

    // 向所有在線上的使用者發送已處理完的訊息
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  connection.on("close", () => {
    console.log("使用者已斷開連線");
  });
});
