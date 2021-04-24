console.log("Starting App...")

const express = require("express");
const app = express();

const mysql = require("mysql2");
var migration = require('mysql-migrations');
var connection = mysql.createConnection({
    connectionLimit : 10,
    host: "localhost",
    user: "root",
    database: "distance_learning",
    password: "lytvynskyi"
});


// migration.init(connection, __dirname + '/migrations', function() {
//   console.log("Check migrations...");
//  });


async function start() {
    try {
      await connection.connect(function(err){
        if (err) {
          return console.error("Error: " + err.message);
        }
        else{
          console.log("MySQL connection success! :)");
        }
     });
  
      app.listen((PORT = 5000), () => {
        console.log(`App has been stared on ${PORT}. DB is avalieble`);
      });
    } catch (e) {
      console.log(`Server error ${e.message}`);
      process.exit(1);
    }
  }
  
start();