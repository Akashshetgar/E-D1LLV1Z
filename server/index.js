import express from "express";
import * as http from "http";
// import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import net from "net";
import { Console, time } from "console";

const app = express();

dotenv.config();

// app.use(bodyParser.json({ limit: "30mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// app.use(cors());
function readInt64BEasFloat(buffer, offset) {
  var low = readInt32BE(buffer, offset + 4);
  var n = readInt32BE(buffer, offset) * 4294967296.0 + low;
  if (low < 0) n += 4294967296;
  return n;
}
// CONNECTION WITH MARKET DATA STREAM SERVER
const tcpClient = new net.Socket();
// tcpClient.setEncoding('ucs-2')

tcpClient.connect(3000, "localhost", () => {
  console.log("Connected to TCP server.");
  tcpClient.write(Buffer.from([0x41]));

  // Event handler for receiving data from TCP server
  tcpClient.on("data", (data) => {
    
    var packetSize = 130;
    var byteSize = 2;
    var i = 0;
    while(i<data.length-130) {
      const packetLength = data.subarray(i, i+4);
      const tradingSymbol = data.subarray(i+4, i+34);
      const sequnceNumber = data.subarray(i+34, i+42);
      const timeStamp = data.subarray(i+42, i+50);
      const date = new Date(Number(timeStamp.readBigInt64LE()));
      const LTP = data.subarray(i+50, i+58);
      const LTQ = data.subarray(i+58, i+66);
      const volume = data.subarray(i+66, i+74);
      const bidPrice = data.subarray(i+74, i+82);
      const bidQty = data.subarray(i+82, i+90);
      const askPrice = data.subarray(i+90, i+98);
      const askQuantity = data.subarray(i+98, i+106);
      const OI = data.subarray(i+106, i+114);
      const prevClosePrice = data.subarray(i+114, i+122);
      const prevCloseInterest = data.subarray(i+122, i+130);
      
      console.log({
        "packetLength": packetLength.readInt32LE(0),
        "tradingSymbol": tradingSymbol.toString('utf8'),
        "sequnceNumber": sequnceNumber.readBigInt64LE(),
        "timeStamp": date.toISOString(),
        "LTP": LTP.readBigInt64LE(),
        "LTQ": LTQ.readBigInt64LE(),
        "volume": volume.readBigInt64LE(),
        "bidPrice": bidPrice.readBigInt64LE(),
        "bidQty": bidQty.readBigInt64LE(),
        "askPrice": askPrice.readBigInt64LE(),
        "askQuantity": askQuantity.readBigInt64LE(),
        "OI": OI.readBigInt64LE(),
        "prevClosePrice": prevClosePrice.readBigInt64LE(),
        "prevCloseInterest": prevCloseInterest.readBigInt64LE()
  
      });
    }

    i = i + 130;
    try {
    } catch (error) {
      console.log("Error in ",error);
    }
    
    // console.log("tcpData", data[0].toString(32).length);
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
