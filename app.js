console.log("Starting App...")

const express = require("express");
const app = express();
const router = express.Router();
const authRouter = require('./routes/auth.routes.js');




app.use(express.json({ extendet: true }));
// Роуты
app.use("/api/auth", require("./routes/auth.routes"));
//

const mysql = require("mysql2");

const connection = mysql.createConnection({
  connectionLimit : 10,
  host: "localhost",
  user: "root",
  database: "distance_learning",
  password: "lytvynskyi"
});

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