const express = require('express');
const router = express.Router();
const ClassesController = require('../controller/classes.controller');
const userController = require('../controller/user.controller');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createUserSchema, updateUserSchema, validateLogin } = require('../middleware/validators/userValidator.middleware');


// api/auth/registration
// router.post("/registrations", awaitHandlerFactory(userController.createUser));
router.get("/myclasses", async (req, res) => {
  try {
    const myclass = await ClassesController.getAllUserClasess(req.headers.user_id,res);
    if(myclass){
      res.json(myclass);
    }else{
      res.status(200)
    }
    
  } catch (e) {
    console.log(e)
    // res.status(500).json({ message: "Something is wrong. Try again :(" });
  }
})

router.get("/about_classes/:id", async(req,res) => {
  try{
    const about_class = await ClassesController.getClassesById(req.params.id,res)
    res.json(about_class)
  }catch(e){
    // res.status(500).json({message:"Something is wrong. Try again :("})
  }
})

router.get("/connected_classes", async(req,res) => {
  try{
    const user_id = req.headers.user_id
    const user_connected_classes = await ClassesController.getConnectedClasses(user_id, res)
    if(user_connected_classes){
      res.json(user_connected_classes)
    }else{
      res.status(200)
    }
    
  } catch(e){
    res.status(500).json({message:"Something is wrong. Try again :("})
  }
})

router.post("/connect_to_class", async(req,res) => {
  try{
    const code = req.body
    const user_id = req.headers.user_id
    const connect = await ClassesController.connectToClass(res,code,user_id)
    switch(connect){
      case 0:
        res.status(500).json({ message: "Вы уже подключены к этому классу!" });
      break;
      case 1:
        res.status(500).json({ message: "Такого класса не существует!" });
        break
      default:
        res.status(201).json({ message: "Вы успешно подключились к классу! 😉"});
    }
  }catch(e){
    res.status(500).json({ message: "Something is wrong. Try again" });
  }
})

router.post("/create_class", async (req,res) => {
    try{
    const create_class = req.body
    const user_id = req.headers.user_id
    const newClass = ClassesController.createClass(create_class,res,null,user_id)
    res.status(201).json({ message: "Класс успешно создан! 😉", id:res.id});
    // res.status(201).json({ message: "Class created 😉" });
    } catch(e){
      res.status(500).json({ message: "Something is wrong. Try again" });
    }
})

module.exports = router;