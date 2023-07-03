import mongoose from "mongoose";

const derivativeSchema = mongoose.Schema({
  index: String,
  type: String,
  strikePrice: Number,
  expiry: Date,
  timestamp: Date,
  LTP: Number,
  LTQ: Number,
  volume: Number,
  bidPrice: Number,
  bidQty: Number,
  askPrice: Number,
  askQuantity: Number,
  OI: Number,
  prevClosePrice: Number,
  prevCloseInterest: Number,
  IV: Number,
});

const Derivative = mongoose.model("Derivative", derivativeSchema);

export default Derivative;
