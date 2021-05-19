console.log("Starting App...")

const express = require("express");
const app = express();
const router = express.Router();
const authRouter = require('./routes/auth.routes.js');
const dotenv = require('dotenv');
const cors = require("cors");
const bodyParser = require("body-parser");
const HttpException = require('./utils/HttpException.utils');
const { createProxyMiddleware } = require('http-proxy-middleware');



app.use(express.json({ extendet: true }));

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));



app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/classes", require("./routes/classes.routes"))

//
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;