const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
let chatRooms = {};

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("a user connected : ", socket.id);

  socket.emit("message", "Welcome to websocket server");

  socket.on("send_message", (data) => {
    console.log("message received :", data);
    socket.broadcast.emit("broadcast", {
      username: data.username,
      message: data.message,
    });
  });

  socket.on("create_group", (roomId) => {
    console.log("Group created with ID:", roomId);
    if (!chatRooms[roomId]) {
      chatRooms[roomId] = { members: [] };
    }
    socket.join(roomId);
    chatRooms[roomId].members.push(socket.id);
    console.log(chatRooms);
    io.emit("update_groups_list", Object.keys(chatRooms));
  });
});

app.get("/", (req, res) => {
  res.send("Welcome to chat app");
});
server.listen(4000, () => {
  console.log("server is working on http://localhost:4000");
});
