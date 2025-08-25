const express = require('express');
const {supabase} = require('./database');
const formUpload = express.Router();

formUpload.post('/',async (req,res)=>{
  const formData = req.body;
  try{
    const {data, err} = await supabase.from('form').insert([{buyer_name: formData.name, buyer_email: formData.email, payment_method: formData.method, money: formData.price, type: formData.type, remark: formData.remark}]).select();
    if(err){
      throw err;
    }

    const form_id = data[0].id;
    const excludeKeys = ["email", "name", "type", "price", "method", "image","remark"];
    const filteredData = Object.fromEntries(
      Object.entries(formData).filter(([key]) => !excludeKeys.includes(key))
    );

    const rowToInsert = Object.entries(filteredData).map(([key,value])=>({form_id: form_id, data: value, data_desc: key}));

    const {data2, err2} = await supabase.from('form_purchase_details').insert(rowToInsert).select();

    if(err2){
      throw err2;
    }
  }
  catch(err){
    console.error(err);
  }
  res.json({ok:'ok'});
});

module.exports = formUpload;