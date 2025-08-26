const express = require('express');
const {supabase} = require('./database');

const search = express.Router();

let cards;
const fetchData = async () =>{
  try{
    const {data, err} = await supabase.from('items').select('*');
    if(err){
      throw err;
    }
    if(data && data.length>0){
      cards = await data;
    }
    else{
      cards = {error: "Keyword not found!"}
    }
  }
  catch(err){
    console.error(err);
    cards = {error: "Keyword not found!"}
  }
}

fetchData();

search.post('/',(req,res)=>{
  const keyword = req.body.keyword;
  let j = 0;
  if('error' in cards){
    return res.json({error: 'keyword not found!'})
  }
  const filteredCards = cards.filter((item,index)=>{
    for(let i=0;i<=item.name.length-keyword.length;i++){
      if(item.name[i].toUpperCase() === keyword[j].toUpperCase()){
        j++;
      }
      else{
        j = 0;
      }
      if(j === keyword.length){
        j = 0;
        return true;
      }
    }
    return false;
  })
  res.json(filteredCards);
})

module.exports = search;