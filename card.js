const express = require("express");
const {supabase} = require("./database");

const card = express.Router();

card.get("/",(req,res)=>{
  const fetchItems = async () =>{
    try{
      const {data,err} = await supabase.from('items').select('*').order('id',{ascending: true});

      if(err){
        throw err;
      }

      res.json(data)
    }
    catch(err){
      console.error(err);
    }
  }

  fetchItems();
});

module.exports = card;