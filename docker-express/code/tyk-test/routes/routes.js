var express     	= require('express');

var Router 			= express.Router();
var userRouter 		= require('./user.js');
var privilegeRouter = require('./privilege.js');

Router.use('/user', userRouter);
Router.use('/privilege', privilegeRouter);

module.exports = Router;