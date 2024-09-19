const usermodel = require("../models/usermodel.js");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const registercontroller=async(req,res)=>{
    try{
        const {username,email,password,phone,address}=req.body
        //validation
        if(!username||!email||!password||!address||!phone)
        {
            return res.status(500).send({
                success:false,
                message:'please provide all fields'
            })
        }
        //check user
        const existing=await usermodel.findOne({email});
        if(existing)
        {
            return res.status(500).send(
                {
                    success:false,
                    message:'email already registered please login'
                }
            );
        }

        //hashing password
        var salt=bcrypt.genSaltSync(10);
        const hashpass=await bcrypt.hash(password,salt);


        //create new user

        const user=await usermodel.create({username,email,password:hashpass,address,phone})
        res.status(201).send({
            success:true,
            message:'successfully registered',
            user
        })
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'error in register api',
            error
        })
    }
};


//login controllers
const logincontrollers=async(req,res)=>{
    try{
        const {email,password}=req.body;
        //validation
        if(!password || !email)
        {
            return res.status(500).send({
                success:false,
                message:'please provide email or password'
            });
        }
        //check user
        const user=await usermodel.findOne({email});
        if(!user)
        {
            return res.status(404).send({
                success:false,
                message:"User is not found"
            });
        }

        //check user password|compare password
        const ismatch=await bcrypt.compare(password,user.password);
        if(!ismatch)
        {
            return res.status(500).send({
                status:false,
                message:"Invalid creadials"
            });
        }

        //token
        const token=jwt.sign({id:user._id},process.env.jwt_secret,{
            expiresIn:"30d",
        });



        res.status(200).send({
            success:true,
            message:"login successfully",
            token,
            user
        });
    }
    catch(error)
    {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in login api',
            error
        });
    }
}

module.exports={registercontroller,logincontrollers};