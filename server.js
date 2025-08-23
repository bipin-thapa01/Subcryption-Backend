const express = require("express");
const cors = require("cors");
const card = require("./card");
const item = require('./item');
const payment = require('./payment');
const formUpload = require('./uploadForm');
const email = require('./email');

const server = express();

server.use(cors());
server.use(express.json());

server.use("/card", card);
server.use("/item", item);
server.use('/payment',payment);
server.use('/upload-form',formUpload);
server.use('/send-email',email);

server.get("/", (req, res) => {
  res.send("Backend is working");
});

server.listen(5000, () => {
  console.log("Server running at http://localhost:5000/");
});
