import calculate_iv from "./script.js";
import rclient from "./redisConnector.js";
import socket_io_server from "../index.js";


const allTradingSymbols = new Set();

export const handleNetStream = async (data) => {
  const jsonPkts = [];
  // jsonPkts.splice(0, jsonPkts.length);
  var packetSize = 130;
  var byteSize = 2;
  var i = 0;
  
  while (i <= data.length - 130) {
    const packetLength = data.subarray(i, i + 4);
    if (packetLength.readInt32LE(0) !== 124) {
   
      break;
      // continue;
    }
    const tradingSymbol = data.subarray(i + 4, i + 34);
    const sequnceNumber = data.subarray(i + 34, i + 42);
    // console.log(Number(sequnceNumber.readBigInt64LE()));
    const timeStamp = data.subarray(i + 42, i + 50);
    const date = new Date(Number(timeStamp.readBigInt64LE()));
    const LTP = data.subarray(i + 50, i + 58);
    const LTQ = data.subarray(i + 58, i + 66);
    const volume = data.subarray(i + 66, i + 74);
    const bidPrice = data.subarray(i + 74, i + 82);
    const bidQty = data.subarray(i + 82, i + 90);
    const askPrice = data.subarray(i + 90, i + 98);
    const askQuantity = data.subarray(i + 98, i + 106);
    const OI = data.subarray(i + 106, i + 114);
    const prevClosePrice = data.subarray(i + 114, i + 122);
    const prevOpenInterest = data.subarray(i + 122, i + 130);

    const extractedTradingSymbol = tradingSymbol
      .toString("utf8")
      .replace(/\0/g, "");
    const name = extractedTradingSymbol.match(/(\d{2}[A-Z]+\d{2})(\d+)/);

    let jsonPkt = {
      tradingSymbol : extractedTradingSymbol,
      index: extractedTradingSymbol,
      LTP: (Number(LTP.readBigInt64LE()) ) / 100.0,
      timestamp: date.toISOString(),
      prevClosePrice: Number(prevClosePrice.readBigInt64LE())/ 100.0,
    };

    // console.log(`date:${jsonPkt.timestamp}`);
    let ts = extractedTradingSymbol;
    let sp;
    let expry;
    let typ;

    let indianDate;
    let IV_Calc;

    if (name !== null) {
      // IT IS A DERIVATIVE PACKET
      ts = extractedTradingSymbol.match(/^[A-Za-z]+/)[0];
      expry = name[1];
      sp = parseInt(name[2]);
      typ = extractedTradingSymbol.slice(-2);

      jsonPkt = {
        ...jsonPkt,
        packetLength: packetLength.readInt32LE(0),
        sequnceNumber: Number(sequnceNumber.readBigInt64LE()),
        LTQ: (Number(LTQ.readBigInt64LE()) ),
        volume: Number(volume.readBigInt64LE()),
        bidPrice: (Number(bidPrice.readBigInt64LE()) ) / 100.0,
        bidQty: Number(bidQty.readBigInt64LE()),
        askPrice: (Number(askPrice.readBigInt64LE()) ) / 100.0,
        askQuantity: Number(askQuantity.readBigInt64LE()),
        OI: Number(OI.readBigInt64LE()),
        prevOpenInterest: Number(prevOpenInterest.readBigInt64LE()),
      };

      indianDate = new Date(jsonPkt.timestamp);
      indianDate = new Date(indianDate.getTime() + 5.5 * 60 * 60 * 1000);
      indianDate = indianDate.toISOString();

      IV_Calc = calculate_iv({
        symbol: extractedTradingSymbol,
        LTP: jsonPkt.LTP,
        LTQ: jsonPkt.LTQ,
        totalTradedVolume: jsonPkt.volume,
        bestBid: jsonPkt.bidPrice,
        bestAsk: jsonPkt.askPrice,
        bestBidQty: jsonPkt.bidQty,
        bestAskQty: jsonPkt.askQuantity,
        openInterest: jsonPkt.OI,
        timestamp: indianDate,
        sequence: jsonPkt.sequnceNumber,
        prevClosePrice: jsonPkt.prevClosePrice,
        prevOpenInterest: jsonPkt.prevCloseInterest,
      });

      jsonPkt = {...jsonPkt, IV: IV_Calc, index: ts, type: typ, strikePrice: sp, expiry: expry}

      // PUSH PACKET to DERIVATIVE collection  
      // pushDerivativeEntry(jsonPkt)

    }else{
      jsonPkt = {...jsonPkt, type: "index"}
      // console.log(jsonPkt);
      
      // PUSH PACKET to INDEX collection  
    }
    // const newJsonPkt = {
    //   index: ts,
    //   type: typ,
    //   strikePrice: sp,
    //   expiry: expry,
    //   timeStamp: indianDate,
    //   LTP: jsonPkt.LTP,
    //   LTQ: jsonPkt.LTQ,
    //   volume: jsonPkt.volume,
    //   bidPrice: jsonPkt.bidPrice,
    //   bidQty: jsonPkt.bidQty,
    //   askPrice: jsonPkt.askPrice,
    //   askQuantity: jsonPkt.askQuantity,
    //   OI: jsonPkt.OI,
    //   prevClosePrice: jsonPkt.prevClosePrice,
    //   prevCloseInterest: jsonPkt.prevCloseInterest,
    //   IV: IV_Calc,
    //   // tradingSymbol: jsonPkt.tradingSymbol,
    // };
    // console.log(jsonPkt);
    // rclient.exists(jsonPkt.index, (err, reply) => {
    //   if (err) {
    //     console.error('Error:', err);
    //     // Handle the error
    //   } else {
    //     if (reply === 1) {
    //       socket_io_server.emit(jsonPkt.index, jsonPkt);
    //       console.log('sock emitted');
    //     } else {
    //       console.log('sock not emitted');
    //     }
    //   }
    // });
    allTradingSymbols.add({type: jsonPkt.typ, index: jsonPkt.index, expiry: jsonPkt.expiry, strikePrice: jsonPkt.strikePrice, tradingSymbol: jsonPkt.tradingSymbol });
    socket_io_server.on("connection", (socket) => {
      if(i%130 == 0){
        socket.emit("allTradingSymbols", Array.from(allTradingSymbols));

      }
      // socket.emit("hello", "hello there");
      socket.emit(jsonPkt.tradingSymbol, jsonPkt);
      // socket.off(jsonPkt.index)
    });
    await rclient.set(jsonPkt.index, JSON.stringify(jsonPkt))
    jsonPkts.push(jsonPkt);
    i = i + 130;
  }
  // console.log(jsonPkts);
  return jsonPkts;
};