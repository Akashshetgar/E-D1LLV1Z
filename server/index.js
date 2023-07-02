import express from "express";
import * as http from "http";
// import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import net from "net";


const app = express();
const server = http.createServer(app);
dotenv.config();


// CONNECTION WITH MARKET DATA STREAM SERVER
const tcpClient = new net.Socket();
tcpClient.connect(process.env.DATA_STREAM_SERVER_PORT, "localhost", () => {
  console.log("Connected to TCP server.");
  tcpClient.write(Buffer.from([0x41]));

  // Event handler for receiving data from TCP server
  tcpClient.on("data", (data) => {
    
    const packetSize = 130;
    const byteSize = 2;
    let i = 0;
    const transformedPackets = []
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

      transformedPackets.push({
        packetLength: packetLength.readInt32LE(0),
        tradingSymbol: tradingSymbol.toString('utf8'),
        sequenceNumber:Number(sequnceNumber.readBigInt64LE()),
        timeStamp: date.toISOString(),
        LTP:Number( LTP.readBigInt64LE()),
        LTQ:Number( LTQ.readBigInt64LE()),
        volume:Number( volume.readBigInt64LE()),
        bidPrice: Number(bidPrice.readBigInt64LE()),
        bidQty: Number(bidQty.readBigInt64LE()),
        askPrice:Number( askPrice.readBigInt64LE()),
        askQuantity:Number( askQuantity.readBigInt64LE()),
        OI:Number( OI.readBigInt64LE()),
        prevClosePrice:Number( prevClosePrice.readBigInt64LE()),
        prevCloseInterest: Number(prevCloseInterest.readBigInt64LE())
      })
      
      // let packetObj = {
      //   "packetLength": packetLength.readInt32LE(0),
      //   "tradingSymbol": tradingSymbol.toString('utf8'),
      //   "sequnceNumber":Number(sequnceNumber.readBigInt64LE()),
      //   "timeStamp": date.toISOString(),
      //   "LTP":Number( LTP.readBigInt64LE()),
      //   "LTQ":Number( LTQ.readBigInt64LE()),
      //   "volume":Number( volume.readBigInt64LE()),
      //   "bidPrice": Number(bidPrice.readBigInt64LE()),
      //   "bidQty": Number(bidQty.readBigInt64LE()),
      //   "askPrice":Number( askPrice.readBigInt64LE()),
      //   "askQuantity":Number( askQuantity.readBigInt64LE()),
      //   "OI":Number( OI.readBigInt64LE()),
      //   "prevClosePrice":Number( prevClosePrice.readBigInt64LE()),
      //   "prevCloseInterest": Number(prevCloseInterest.readBigInt64LE())
      // };
      // console.log(packetObj);
      i = i + 130;
    }
    console.log(`transformedPackets.length: ${transformedPackets.length}`);
    console.log(`transformedPackets: ${JSON.stringify(transformedPackets)}`);
    console.log("Data received");
    // console.log("tcpData", data[0].toString(32).length);
  });
  
  // Event handler for TCP connection close
  tcpClient.on("close", () => {
    console.log("TCP connection closed.");
  });
});


// CONNECTION WITH CLIENT SIDE
const socket_io_server = new Server(server,{
  cors: {
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST"]
  }
});

socket_io_server.listen(process.env.PORT, (socket) => {
  console.log("Socket.io server listening on port 5000");
  socket.emit("data", { message: "Hello from server!" });
    socket.on("disconnect", () => {
      console.log("Socket.io client disconnected.");
    });

});


app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

// server.listen(5000, () => {
//   console.log(`listening on port:${process.env.PORT}`);
// });
