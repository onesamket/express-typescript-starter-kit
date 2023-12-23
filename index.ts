import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.broadcast.emit("hey all of you");

  socket.on("message", (data) => {
    // Extract the username and text from the data object
    const { username, text } = data;

    // Broadcast the message to all connected clients except the sender
    socket.broadcast.emit("message", { username, text });

    console.log(`${username} said: ${text}`);
  });

  socket.on("disconnect", () => {
    console.clear();
    io.emit("message", `${socket.id} left the chat`);
    console.log(`User left: ${socket.id}`);
  });
});

const port = 4000;
server.listen(port, () => console.log(`Server Running on port ${port}`));
