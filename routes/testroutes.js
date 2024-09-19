 const express=require('express');
const { testcontroller } = require('../controllers/testcontroller.js');


 //router object
 const router=express.Router()

//All routes get|post|put|delete
router.get('/test',testcontroller);

 //export
 module.exports=router