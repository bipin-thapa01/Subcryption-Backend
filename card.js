const express = require("express");
const database = require("./database.js");

const card = express.Router();

card.get("/",(req,res)=>{
  database.query('select * from items',(err,result)=>{
    if(err){
      console.error(err);
    }
    else{
      res.json(result);
    }
  });
});

module.exports = card;