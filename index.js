// Importing necessary modules
const express = require("express"); // Express is a web framework for Node.js
const http = require("http"); // HTTP module to create the server
const { Server } = require("socket.io"); // Socket.IO is used for real-time communication
const connection = require("./db.js");
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
// Initializing the Express app
const app = express();
app.use(express.json());
connection();

// Creating an HTTP server with the Express app
const server = http.createServer(app);

// Initializing a new instance of Socket.IO server
const io = new Server(server, {
  cors: {
    origin: "*", // Allowing CORS for all origins
  },
});
// Handling a new connection to the Socket.IO server
io.on("connection", (socket) => {
  console.log("connected");

  // Load all messages from the database when a client connects
  const loadMessage = async () => {
    try {
      const messages = await Chat.find().sort({ timeStamp: 1 }).exec();
      socket.emit("chat", messages);
    } catch (err) {
      console.log(err);
    }
  };
  loadMessage();

  // Listen for 'newMessage' event from the client
  socket.on('newMessage', async (msg) => {
    try {
      const newMessage = new Chat({
        username: msg.username,
        message: msg.message,
        avatar: msg.avatar,
        timeStamp: msg.timeStamp // Assuming timeStamp is part of the msg object
      });
      await newMessage.save();
      io.emit('message', msg); // Broadcast the new message to all connected clients
    } catch (err) {
      console.log(err);
    }
  });

  // Handling disconnection of a client
  socket.on("disconnect", () => {
    console.log("disconnect");
  });
});

// Starting the server on port 3001
server.listen(3001, () => {
  console.log("server is running on 3001");
});
