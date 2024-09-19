 const express=require('express')
const { registercontroller, logincontrollers } = require('../controllers/registercontroller.js')

 const router=express.Router()

 //route
 ///Register||post
 router.post('/register',registercontroller);

 //login||post
 router.post('/login',logincontrollers);


 module.exports=router
