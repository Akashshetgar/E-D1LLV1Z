import express from "express";
import * as http from "http";
// import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import net from "net";
import calculate_iv from "./utils/script.js";
import mongoose from "mongoose";
import { handleNetStream } from "./utils/PacketStreamHandler.js";
import rclient from "./utils/redisConnector.js";

const app = express();
const server = http.createServer(app);
const socket_io_server = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

socket_io_server.sockets.setMaxListeners(2000);

socket_io_server.listen(5000, () => {
  console.log(`listening on port:${5000}`);
});

// CONNECTION WITH MARKET DATA STREAM SERVER
const tcpClient = new net.Socket();
const jsonPkts = [];

tcpClient.connect(8000, "localhost", () => {
  console.log("Connected to TCP server.");
  tcpClient.write(Buffer.from([0x41]));
  // Event handler for receiving data from TCP server
  tcpClient.on("data", (data) => {
    const jsonPkts = handleNetStream(data);
    if (jsonPkts.length > 0) {
      // console.log(jsonPkts);
      if (socket_io_server.engine.clientsCount > 0) {
        socket_io_server.emit("data", jsonPkts);
        console.log("tcpData emitted");
      }
    }
  });

  // Event handler for TCP connection close
  tcpClient.on("close", () => {
    console.log("TCP connection closed.");
  });
}).on("error", (err) => {
  console.log("Error: ", err.message);
});
dotenv.config();

socket_io_server.on("connection", (socket) => {
  console.log("Socket.io client connected");

  socket.on("disconnect", () => {
    console.log("Socket.io client disconnected.");
  });
});


app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

app.get("/allTradingSymbols",async (req, res)=>{
  await rclient.keys('*', (err, keys) => {
    if (err) {
      console.error('Error:', err);
      // Handle the error
    } else {
      console.log('Keys:', keys);
      // Process the keys array
    }
  });
});

app.listen(5001, () => {
  console.log(`Example app listening on port ${5001}`)
})
// mongoose
//   .connect(process.env.DB_CONNECTION_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Mongo connect ho gaya"))
//   .catch((err) => console.log(err.message));

// app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))

export default socket_io_server;