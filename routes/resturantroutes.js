const express=require('express');
const authmiddleware=require("../middlewares/authmiddleware.js");
const { createcontroller, getallresturantcontroller, getrestaurant,deleteresturant } = require('../controllers/resturantcontroller.js');
//Router()
 const router=express.Router()

 //route
 //Create Resturant ||POST
 router.post('/create',authmiddleware,createcontroller);
 //getall resturant
 router.get("/getall",authmiddleware,getallresturantcontroller);

  //get resturant by id
  router.get("/getresturant/:id",authmiddleware,getrestaurant);

 //delete resturant ||delete
 router.delete("/deleteresturant/:id",authmiddleware,deleteresturant);

 //exports
 module.exports=router
