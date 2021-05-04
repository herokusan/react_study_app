const ClassesModel = require('../models/classes.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const UserModel = require('../models/user.model');
const UserController = require('../controller/user.controller');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');


class ClassesController {
    // don't touch
    getAllClasses = async (req, res, next) => {
        let ClassesList = await ClassesModel.find();

        if(!ClassesList){
            res.send("Not Classes")
        }

        ClassesList = ClassesList.map(classes => {
            return classes;
        });

        res.send(ClassesList);
    };
    getAllUserClasess = async (params,res) => {
        console.log("2222222222222222222222222222222")
        console.log(params)
        // const user = await UserModel.find({user_created: params});
        const classes = await ClassesModel.findByUserCreated({user_created :params })
        console.log(classes)
        res.send(classes);
    }

    getUserById = async (req, res, next) => {
        const userClass = await ClassesModel.findByUser({ user_created: 1 });

        UserClassList = userClass.map(classes => {
            return classes
        })


        console.log(UserClassList)
        if (!UserClassList) {
            throw new HttpException(404, 'User not found');
        }


        res.send(UserClassList);
    };

    getUserByuserName = async (req, res, next) => {
        const user = await UserModel.findOne({ username: req.params.username });
        if (!user) {
            throw new HttpException(404, 'User not found');
        }

        const { password, ...userWithoutPassword } = user;

        res.send(userWithoutPassword);
    };

    getCurrentUser = async (req, res, next) => {
        const { password, ...userWithoutPassword } = req.currentUser;

        res.send(userWithoutPassword);
    };

    createClass = async (req,res, next, user_id) => {
        const result = await ClassesModel.create(req,user_id);

        if (!result) {
            throw res.status(500).json({ message: "Something is wrong. Try again" });
        }

        res.status(201).send('Class was created!');
    };

    updateUser = async (req, res, next) => {
        this.checkValidation(req);

        await this.hashPassword(req);

        const { confirm_password, ...restOfUpdates } = req.body;

        // do the update query and get the result
        // it can be partial edit
        const result = await UserModel.update(restOfUpdates, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'User not found' :
            affectedRows && changedRows ? 'User updated successfully' : 'Updated faild';

        res.send({ message, info });
    };

    deleteUser = async (req, res, next) => {
        const result = await UserModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'User not found');
        }
        res.send('User has been deleted');
    };

    userLogin = async (req, res, next) => {
        this.checkValidation(req);

        const { email, password: pass } = req;

        const user = await UserModel.findOne({ email });

        if (!user) {
            throw new HttpException(401, 'Unable to login!');
        }

        const isMatch = await bcrypt.compare(pass, user.password);

        if (!isMatch) {
            throw new HttpException(401, 'Incorrect password!');
        }

        // user matched!
        const secretKey = process.env.SECRET_JWT || "";

        const token = jwt.sign({ user_id: user.id.toString() }, secretKey, {
            expiresIn: '24h'
        });

        const { password, ...userWithoutPassword } = user;

        res.send({ ...userWithoutPassword, token });
    };

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            console.log(errors)
            throw new HttpException(400, 'Validation faild', errors);
        }
    }

    // hash password if it exists
    hashPassword = async (req) => {
        console.log(req.password)
        console.log(req)
        if (req.password) {
            req.password = await bcrypt.hash(req.password, 8);
        }
    }
}



module.exports = new ClassesController;