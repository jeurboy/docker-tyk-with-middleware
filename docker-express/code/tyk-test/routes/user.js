var express       	= require('express');

var UserController 	= require('../controllers/user.js');
var userRouter 		= express.Router();

userRouter.get("/"	, new UserController().privilege);
userRouter.get("/privilege"	, new UserController().privilege);

module.exports = userRouter;