const mysql = require("mysql2");

const database = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'subcryption',
  port: 3306,
});

database.connect((err)=>{
  if(err){
    console.error(err);
  }
  else{
    console.log("Connected Successfully!");
  }
});

module.exports = database;