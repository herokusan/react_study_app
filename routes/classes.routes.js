const express = require('express');
const router = express.Router();
const ClassesController = require('../controller/classes.controller');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createUserSchema, updateUserSchema, validateLogin } = require('../middleware/validators/userValidator.middleware');


// api/auth/registration
// router.post("/registrations", awaitHandlerFactory(userController.createUser));
router.get("/myclasses", async (req, res) => {
  try {
    const myclass = await ClassesController.getAllClasses({ owner: req.user.userId });
    res.json(myclass);
  } catch (e) {
    res.status(500).json({ message: "Something is wrong. Try again" });
  }
})

router.post("/create_class", async (req,res) => {
    try{
    var create_class = req.body
    ClassesController.createClass(create_class,res)
    res.status(201).json({ message: "Class was created 😉" });
    // res.status(201).json({ message: "Class created 😉" });
    } catch(e){
      res.status(500).json({ message: "Something is wrong. Try again" });
    }
})

module.exports = router;