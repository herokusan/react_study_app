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
    userController.createUser(user,res)
    res.status(201).json({ message: "Пользователь успешно зарегистрирован! 😉" });
  } catch (e) {
    res.status(500).json({ message: "Something is wrong. Try again" });
  }
})

// api/auth/login
router.post('/login', async (req, res) => {
  try {
    var user = req.body
    userController.userLogin(user,res)
  } catch (e) {
    res.status(500).json({ message: "Something is wrong. Try again" });
  }
});

router.get('/user', async(req,res) => {
  try{
    var userId = req.headers.userid
    console.log(userId)
    console.log(req.headers.userid)
    const user = await userController.getUserById(userId,res)
    res.json(user)
  }catch(e){
    res.status(500).json({ message: "Something is wrong. Try again" });
  }
})
router.post('/edit_profile', async(req,res) => {
  try{
    var user = req.body
    userController.updateUser(user,res)
    res.status(201).json({ message: "Данные обновлены! 😉" });
    update
  }catch(e){
    res.status(500).json({ message: "Something is wrong. Try again" });
  }
})

router.post('/forgot', async(req,res) => {
  try{
    const email_user  = await userController.findUserByEmail(req.body.email, res)
    if(email_user.length > 0){
      res.status(201).json({message:"Письмо отправлено на электронную почту"})
    }else{
      res.status(500).json({ message: "Пользователь с таким email не зарегестрирован" });
    }
  }catch(e){
    console.log(e)
  }
})

module.exports = router;