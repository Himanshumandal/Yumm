const usermodel = require("../models/usermodel");
const bcrypt=require('bcryptjs');
//get user 
const getusercontroller=async(req,res)=>{
    try
    {
        //find user
        const user=await usermodel.findById({_id:req.body.id});

        //validation
        if(!user)
        {
            return res.status(404).send({
                success:false,
                message:"User not found"
            });
        }
        //hide password
        user.password=undefined;
        //resp
        res.status(200).send(
            {
                success:true,
                message:"User get Successfully",
                user
            }
        );
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            status:false,
            message:"Error in getuse api"
        });
    }
};

const updateuser=async(req,res)=>{
    try{

        //find user
        const user=await usermodel.findById({_id:req.body.id})
        //validation
        if(!user)
        {
            return res.status(404).send({
                success:false,
                message:"user not found"
            }
            );
        }
        //update
        const {username,address,phone}=req.body;
        if(username)user.username=username;
        if(address)user.address=address;
        if(phone)user.phone=phone;
        //save user
        await user.save();
        res.status(200).send({
            success:true,
            message:"user update successfully",
        })
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            status:false,
            message:"Error in updateuser api",
            error
        });
    }
}

//update user password
const updateuserpass=async(req,res)=>{
    try
    {
        //find user
        const user=await usermodel.findById({_id:req.body.id})
        //validation
        if(!user)
        {
            return res.status(404).send({
                success:false,
                message:'user not found'
            }
            );
        }
        //get password data
        const {oldpassword,newpassword}=req.body
        if(!oldpassword || !newpassword)
        {
            return res.status(500).send({
                status:false,
                message:"password should be correct"
            });
        }

        //check user password|compare password
        const ismatch=await bcrypt.compare(oldpassword,user.password);
        if(!ismatch)
        {
            return res.status(500).send({
                status:false,
                message:"Invalid creadials",
            });
        }

        //hashing password
        
        var salt=bcrypt.genSaltSync(10);
        const hashpass=await bcrypt.hash(newpassword,salt);
        user.password=hashpass;
        
        await user.save();
        res.status(200).send({
            success:true,
            message:"password updated",
        });
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            status:false,
            message:"Error in password update api",
            error
        });
    }

};

const deleteuser=async(req,res)=>{
    try
    {
        await usermodel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success:true,
            message:"Your account has been  deleted"
        });
    }
    catch(error)
    {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in delete Profile api",
            error,
        });
    }
};
//exports
module.exports={getusercontroller,updateuser,updateuserpass,deleteuser};