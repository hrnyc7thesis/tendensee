const mysql = require('mysql');
const config = require('../config.js')

const connection = mysql.createConnection({
  host: config.dbHost,
  user: config.dbUser,
  password: config.dbPass,
  database: "habitdb"
});

connection.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('DBConnection established');
});


module.exports = connection;
