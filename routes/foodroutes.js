const express=require('express');
const authmiddleware=require('../middlewares/authmiddleware');
const { createfood, getallfood, getsinglefood, updatefood, deletefood, placeorder, orderstatus } = require('../controllers/foodcontrollers');
const foodmodel = require('../models/foodmodel');
const adminmiddleware = require('../middlewares/adminmiddleware');


//router
 const router=express.Router()

 //routes
 //create food
 router.post('/createfood',authmiddleware,createfood);

 
 //getall food
 router.get('/getallfood',authmiddleware,getallfood);

 //get single food
 router.get('/getsingle/:id',authmiddleware,getsinglefood);

 //update food
 router.put('/update/:id',authmiddleware,deletefood);
 


  //delete food
  router.delete('/delete/:id',authmiddleware,deletefood)
 //exports



 //order
 router.post('/placeorder',authmiddleware,placeorder);

 //order status
 router.post('/orderstatus/:id',adminmiddleware,authmiddleware,orderstatus);

 module.exports=router
