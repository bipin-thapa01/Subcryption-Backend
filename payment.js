const express = require('express');
const supabase = require('./database');
const payment = express.Router();

payment.get('/',async (req,res)=>{
  try{
    const {data, err} = await supabase.from('payment').select('*');
    if(err){
      throw err;
    }
    else{
      res.json(data);
    }
  }
  catch(err){
    console.error(err);
  }
});

module.exports = payment;