const express = require('express');
const {supabase} = require('./database');

const item = express.Router();

item.post('/', async (req, res) => {
  const clientData = req.body;

  try {
    const { data, error } = await supabase
      .from('items')
      .select('name,company,imgurl,amount(type,price),item_description(description,country,time),requirement(requirement,requirement_desc)').eq('id',clientData.item_id);

    if (error) {
      throw error;
    }

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = item;
