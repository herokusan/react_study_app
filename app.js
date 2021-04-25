console.log("Starting App...")

const express = require("express");
const app = express();
const router = express.Router();
const authRouter = require('./routes/auth.routes.js');
const dotenv = require('dotenv');
const cors = require("cors");
const HttpException = require('./utils/HttpException.utils');




app.use(express.json({ extendet: true }));
// Роуты
// 404 error
dotenv.config();
// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());
// enabling cors for all requests by using cors middleware
app.use(cors());
// Enable pre-flight
app.options("*", cors());

app.use("/api/auth", require("./routes/auth.routes"));
//


async function start() {

  try {
    app.listen((PORT = 5000), () => {
      console.log(`App has been stared on ${PORT}. DB is avalieble`);
    });
  } catch (e) {
    console.log(`Server error ${e.message}`);
    process.exit(1);
  }
}
start();

module.exports = app;