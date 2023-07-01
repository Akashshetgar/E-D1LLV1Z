import express from "express";
import * as http from 'http';
// import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server({
  cors: {
    origin: "http://localhost:3000"
  }
});
dotenv.config();

// app.use(bodyParser.json({ limit: "30mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(process.env.PORT, () => {
  console.log(`listening on port:${process.env.PORT}`);
});
