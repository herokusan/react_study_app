//This is router for autorization!

const { Router } = require("express");
const router = Router();
const mysql = require("mysql2");

const { check } = require("express-validator");

const connection = mysql.createConnection({
  connectionLimit : 10,
  host: "localhost",
  user: "root",
  database: "distance_learning",
  password: "lytvynskyi"
});

// api/auth/registration
router.post("/registration", async (req, res) => {
  try {
    var user = req.body
    connection.query('INSERT INTO classroom_users SET ?', user, (error, results, 
      fields) => {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
    // res.status(201).json({ message: "User created 😉" });
  } catch (e) {
    res.status(500).json({ message: "Something is wrong. Try again" });
  }
});

// api/auth/login
module.exports = router;