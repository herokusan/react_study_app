//This is router for autorization!
const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createUserSchema, updateUserSchema, validateLogin } = require('../middleware/validators/userValidator.middleware');


// api/auth/registration
// router.post("/registrations", awaitHandlerFactory(userController.createUser));
router.post("/reg", async (req, res) => {
  try {
    var user = req.body
    console.log(user.password)
    userController.createUser(user)
    console.log(test)
  } catch (e) {
    res.status(500).json({ message: "Something is wrong. Try again" });
  }
})

// api/auth/login
router.post('/login', validateLogin, awaitHandlerFactory(userController.userLogin) );


module.exports = router;