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
    res.json(myclass);
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
    const user_id = await req.headers.user_id
    const user_connected_classes = await ClassesController.getConnectedClasses(user_id, res)
  } catch(e){
    res.status(500).json({message:"Something is wrong. Try again :("})
  }
})

router.post("/create_class", async (req,res) => {
    try{
    const create_class = req.body
    const user_id = req.headers.user_id
    console.log(user_id)
    ClassesController.createClass(create_class,res,null,user_id)
    res.status(201).json({ message: "Class was created 😉" });
    // res.status(201).json({ message: "Class created 😉" });
    } catch(e){
      res.status(500).json({ message: "Something is wrong. Try again" });
    }
})

module.exports = router;