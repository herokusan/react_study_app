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
    console.log(req.user)
    const myclass = await ClassesController.getAllClasses({ owner: req.user.userId });
    res.json(myclass);
  } catch (e) {
    res.status(500).json({ message: "Something is wrong. Try again" });
  }
})

router.post("/create_class", async (req,res) => {
    try{

    res.status(201).json({ message: "Class created 😉" });
    } catch(e){

    }
})

module.exports = router;