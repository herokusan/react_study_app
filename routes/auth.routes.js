//This is router for autorization!
const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createUserSchema, updateUserSchema, validateLogin } = require('../middleware/validators/userValidator.middleware');

// api/auth/registration
router.post("/registration", awaitHandlerFactory(userController.createUser));

// api/auth/login
router.post('/login', validateLogin, awaitHandlerFactory(userController.userLogin), async (req, res) => {
  try {
    console.log(req)
    console.log(res)
  }
  catch(e){
    console.log(e)
  }
});


module.exports = router;