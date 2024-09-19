const express=require('express');
const authmiddleware=require('../middlewares/authmiddleware');
const { createcontroller, getallcontroller ,updatecategory, deletecategory} = require('../controllers/categorycontroller.js');

//router
 const router=express.Router()

 //routes
 //create cat
 router.post('/createcategory',authmiddleware,createcontroller);
 
 //getall cat
 router.get('/getallcategory',authmiddleware,getallcontroller);

 //update cat
 
  router.put('/updatecategory/:id',authmiddleware,updatecategory);

  //delete cat
  router.delete('/deletecategory/:id',authmiddleware,deletecategory);

 //exports
 module.exports=router
