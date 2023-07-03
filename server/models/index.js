import mongoose from "mongoose";

const indexSchema = mongoose.Schema({
  index: String,
  LTP: Number,
  timestamp: Date,
  prevClosePrice: Number
});

const Index = mongoose.model("Index", indexSchema);

export default Index;
