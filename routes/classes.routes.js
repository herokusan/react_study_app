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

router.get("/all_news_classes", async(req,res) => {
  try{
    const classid = req.headers.classid
    let classes_news = await ClassesController.findAllClassNews(classid, res)
    if(classes_news){
      res.json(classes_news)
    }else{
      res.status(200)
    }
    
  } catch(e){
    console.log(e)
    res.status(500)
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

router.post("/create_content", async (req,res) => {
  try{
  const create_class = req.body
  const classId = req.headers.classid
  const userId = req.headers.userid
  const newConetnt = ClassesController.createContent(classId,create_class,userId,res)
  res.status(201).json({ message: " Новость опубликована!", id:res.id});
  } catch(e){
    res.status(500).json({ message: "Something is wrong. Try again" });
  }
})

router.post("/create_task", async(req,res) => {
  try{
      const create_task_content = req.body
      const classId = req.headers.classid
      const userid = req.headers.userid
      console.log("AAAAAAAAA")
      console.log(userid)
      const newConetnt = await ClassesController.createTask(classId,create_task_content,userid,res)
      res.status(201).json({ message: "Задание опубликовано!", id:newConetnt.insertId});
  }catch(e){
    res.status(500).json({ message: "Something is wrong. Try again" });
  }
})
router.get("/get_task", async(req,res) => {
  try{
      const create_class = req.body
      const classid = req.headers.classid
      const userId = req.headers.userid
      const classes_tasks = await ClassesController.findAllTasks(classid, res)
      console.log(classes_tasks)
      if(classes_tasks){
        res.json(classes_tasks)
      }else{
        res.status(200)
      }
  }catch(e){
    console.log(e)
    res.status(500).json({ message: "Что то с заданиями... Попробуйте перезагрузить страницу!" });
  }
})

router.get("/get_task_by_id", async(req,res) => {
  try{
    const taskid = req.headers.taskid
    const task_by_id = await ClassesController.findTaskById(taskid)
    if(task_by_id){
      res.json(task_by_id)
    }else{
      res.status(200)
    }

  }catch(e){
    console.log(e)
    res.status(500).json({ message: "Что то с заданиями... Попробуйте перезагрузить страницу!" });
  }
})

router.post("/send_task", async(req,res) => {
  try{
      const file_task = req.body
      const taskid = req.headers.taskid
      const userid = req.headers.userid
      const newConetnt = await ClassesController.sendTask(userid,taskid,file_task)
      res.status(201).json({ message: "Задание отправлено на проверку!"});

  }catch(e){
    console.log(e)
    res.status(500).json({ message: "Что то с отправкой задания... Попробуйте перезагрузить страницу!" });
  }})

router.get("/users",async(req,res) => {
  try{
    const classid = req.headers.classid
    const users = await ClassesController.findUserConnect(classid,res)
    if(users){
      res.json(users)
    }else{
      res.status(200)
    }

  }catch(e){
    console.log(e)
    res.status(500).json({ message: "Что то с учениками... Попробуйте перезагрузить страницу!" });
  }
})

router.get("/get_student_work",async(req,res) => {
  try{
    const classid = req.headers.classid
    const users = await ClassesController.findUserConnect(classid,res)
    if(users){
      res.json(users)
    }else{
      res.status(200)
    }

  }catch(e){
    console.log(e)
    res.status(500).json({ message: "Что то с учениками... Попробуйте перезагрузить страницу!" });
  }
})

router.get("/get_all_tasks", async(req,res) => {
  try{
    const taskid = req.headers.taskid
    const classid = req.headers.classid
    const allTasks = await ClassesController.findAllTasksWithoutRating(taskid)
    if(allTasks){
      res.json(allTasks)
    }else{
      res.status(200)
    }
  }catch(e){
    console.log(e)
  }
})
router.post("/send_rating", async(req,res) => {
  try{

  }catch(e){
    console.log(e)
    res.status(500)
  }
})
module.exports = router;