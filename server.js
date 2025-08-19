const express = require("express");
const cors = require("cors");
const card = require("./card");

const server = express();

server.use(cors());
server.use(express.json());

server.use("/card", card);

server.get("/", (req, res) => {
  res.send("Backend is working");
});

server.listen(5000, () => {
  console.log("Server running at http://localhost:5000/");
});
