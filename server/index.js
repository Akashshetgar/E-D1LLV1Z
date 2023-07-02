import express from "express";
import * as http from "http";
// import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import net from "net";
import { Console } from "console";
import { sequencer } from "./utils/PacketStreamHandler.js";

const app = express();

dotenv.config();

// app.use(bodyParser.json({ limit: "30mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// app.use(cors());

// Structure of each TCP Packet
// First field of length 4, packet length, is to be skipped
const packetStructure = [4, 30, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8];

// CONNECTION WITH MARKET DATA STREAM SERVER
const tcpClient = new net.Socket();
// tcpClient.setEncoding('utf16le')

tcpClient.connect(8080, "localhost", () => {
  console.log("Connected to TCP server.");
  tcpClient.write(Buffer.from([0x41]));

  // Event handler for receiving data from TCP server
  tcpClient.on("data", (data) => {
    // Emit the received data as a Socket.io event
    // ITERATING THROUGH BUFFER USING WHILE LOOP - !!NOT WORKING!!
    let index = 0;
    const packetSize = 130;
    const extractedData = [];
    while (index < data.length - 130) {
      let packet = data.subarray(index, index + packetSize);
      // if (index == 130 * 25) console.log("packet: ", packet.toString());
      if (index == 130 * 25) console.log("packet: ", packet);
      let start = 0;
      for (let i = 0; i < packetStructure.length; i++) {
        // console.log(`${size}, ${start}: ${packet.subarray(start, size)}`);
        const element = packet.subarray(start, start + packetStructure[i]);
        if (index == 130 * 25) {
          console.log(`Start, end: ${start},${start + packetStructure[i]}`);
          // console.log(`Element: ${element.toString()}`);
          console.log(`Element: ${element}`);
        }

        if (i == 0) {
          extractedData.push(element.readInt32LE());
        } else if (i == 1) {
          extractedData.push(element.toString("utf8"));
          // extractedData.push(packet.subarray(start, packetStructure[i]))
        } else if (i == 3) {
          const date = new Date(Number(element.readBigInt64LE()));
          extractedData.push(date.toISOString());
        } else {
          extractedData.push(element.readBigInt64LE());
          // extractedData.push(packet.subarray(start, packetStructure[i]))
        }
        start += packetStructure[i];
      }
      // console.log("extractedData: ", extractedData);
      index += packetSize;
      // sequencer(data)
    }
  });

  // Event handler for TCP connection close
  tcpClient.on("close", () => {
    console.log("TCP connection closed.");
  });
});


// SOCKET.IO SERVER FOR PUSING UPDATES TO FRONTEND
const server = http.createServer(app);
const socket_io_server = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});

socket_io_server.on("connection", (socket) => {
  console.log("Socket.io client connected.");

  socket.on("socketData", (data) => {
    tcpClient.write(data);
  });

  socket.on("disconnect", () => {
    console.log("Socket.io client disconnected.");
  });
});

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

server.listen(process.env.PORT, () => {
  console.log(`listening on port:${process.env.PORT}`);
});
