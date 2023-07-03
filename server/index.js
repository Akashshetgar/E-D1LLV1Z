import express from "express";
import * as http from "http";
// import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import net from "net";
import  calculate_iv  from "./utils/script.js";



const app = express();
const server = http.createServer(app);
const socket_io_server = new Server(server,{
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

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
    jsonPkts.splice(0, jsonPkts.length);
    var packetSize = 130;
    var byteSize = 2;
    var i = 0;
    while(i<data.length-130) {
      const packetLength = data.subarray(i, i+4);
      if(packetLength.readInt32LE(0) !== 124) {
        // console.log("packet length is not correct: ",packetLength.readInt32LE(), " ",packetLength.readInt16LE());
        // console.log("smaller packet ",packetLength.subarray(0,2).readInt32LE(), " ",packetLength.subarray(0,2).readInt16LE());
        // i = i + packetLength.readInt32LE(0);
        // setTimeout(() => {}, 1000);
        break;
        // continue;
      }
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

      
      const jsonPkt = {
        packetLength: packetLength.readInt32LE(0),
        tradingSymbol: tradingSymbol.toString('utf8').replace(/\0/g, ''),
        sequnceNumber:Number(sequnceNumber.readBigInt64LE()),
        timeStamp: date.toISOString().toLocaleString('en-IN', {timeZone: 'Asia/Kolkata'}),
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
        
      };
      const IV_Calc = calculate_iv({
        'symbol': jsonPkt.tradingSymbol,
        'LTP':  jsonPkt.LTP,
        'LTQ':  jsonPkt.LTQ,
        'totalTradedVolume':  jsonPkt.volume,
        'bestBid':  jsonPkt.bidPrice,
        'bestAsk':  jsonPkt.askPrice,
        'bestBidQty':   jsonPkt.bidQty,
        'bestAskQty':   jsonPkt.askQuantity,
        'openInterest':   jsonPkt.OI,
        'timestamp': jsonPkt.timeStamp,
        'sequence':   jsonPkt.sequnceNumber,
        'prevClosePrice':   jsonPkt.prevClosePrice,
        'prevOpenInterest':   jsonPkt.prevCloseInterest
      });

      const newJsonPkt = {
        tradingSymbol: jsonPkt.tradingSymbol,
        timeStamp: jsonPkt.timeStamp,
        LTP: jsonPkt.LTP,
        LTQ: jsonPkt.LTQ,
        volume: jsonPkt.volume,
        bidPrice: jsonPkt.bidPrice,
        bidQty: jsonPkt.bidQty,
        askPrice:jsonPkt.askPrice,
        askQuantity:jsonPkt.askQuantity,
        OI:jsonPkt.OI,
        prevClosePrice:jsonPkt.prevClosePrice,
        prevCloseInterest: jsonPkt.prevCloseInterest,
        IV: IV_Calc
      };
      jsonPkts.push(newJsonPkt);
      
      console.log({
        packetLength : packetLength.readInt32LE(0),
        tradingSymbol: tradingSymbol.toString('utf8'),
        sequnceNumber:Number(sequnceNumber.readBigInt64LE()),
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
  
      });
      i = i + 130;
    }
    if(socket_io_server.engine.clientsCount > 0) {
      socket_io_server.emit("data", jsonPkts);
      console.log("tcpData emitted",);
    }
  
  });
  
  // Event handler for TCP connection close
  tcpClient.on("close", () => {
    console.log("TCP connection closed.");
  });
});
dotenv.config();


socket_io_server.on('connection', (socket) => {
  console.log("Socket.io client connected");
 
  socket.on("disconnect", () => {
    console.log("Socket.io client disconnected.");
  });

});


app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

