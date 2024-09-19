const express=require('express');
const { getusercontroller, updateuser, updateuserpass, deleteuser } = require('../controllers/usercontroller.js');
const authmiddleware = require('../middlewares/authmiddleware.js');

 const router=express.Router()

 //route
 //GET user||GET
 router.get('/getuser',authmiddleware,getusercontroller);

 //Update user||PUT 

 router.put('/updateuser',authmiddleware,updateuser);

 //update user password || post
 router.post('/updateuserpass',authmiddleware,updateuserpass);

 //delete user ||delete
 router.delete('/deleteuser/:id',authmiddleware,deleteuser);
 module.exports=router
