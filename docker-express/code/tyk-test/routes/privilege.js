var express       	= require('express');

var PrivilegeController 	= require('../controllers/privilege.js');
var PrivilegeRouter 		= express.Router();

PrivilegeRouter.get("/get"	    , new PrivilegeController().privilege_get);
PrivilegeRouter.get("/check"	, new PrivilegeController().privilege_check);
PrivilegeRouter.post("/set"   	, new PrivilegeController().privilege_set);

module.exports = PrivilegeRouter;