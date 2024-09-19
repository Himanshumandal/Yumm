const categorymodel = require("../models/categorymodel");


const createcontroller=async(req,res)=>
{
    try{
        const {title,imageurl}=req.body
        //validation
        if(!title)
        {
            return res.status(500).send({
                success:false,
                message:"Please Provide category titles or image"
            });
        }
        const newcategory=new categorymodel({
            title,
            imageurl
        });
        await newcategory.save();
        res.status(201).send({
            success:true,
            message:"category created",
            newcategory,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Create category api",
            error
        });
    }
};

//getall category
const getallcontroller=async(req,res)=>{
    try{
        const categories=await categorymodel.find({});
        if(!categories)
        {
            return res.status(404).send({
                status:false,
                message:"No categories found"
            });
        }
        res.status(200).send({
            success:true,
            totalcat:categories.length,
            categories,
        });
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in getall category api",
            error
        });
    }

};

//update category
const updatecategory=async(req,res)=>{
    try
    {
        const {id}=req.params;
        const{title,imageurl}=req.body;
        const updatedcategory=await categorymodel.findByIdAndUpdate(
            id,
            {title,imageurl},
            {new:true}
        );
        //validation
        if(!updatedcategory)
        {
            return res.status(404).send({
                status:false,
                message:"No category found"
            });
        }
        res.status(200).send({
            success:true,
            message:"Category Update successfully"
        });
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in getall category api",
            error
        });
    }
};

//delete cat
const deletecategory=async(req,res)=>{
    try{
        const {id}=req.params;
        //validation
        if(!id)
        {
            return res.status(500).send({
                status:false,
                message:"Provide category id "
            });
        }
        //find resturant
        const category=await categorymodel.findById(id);
        if(!category)
        {
                return res.status(500).send({
                    status:false,
                    message:"No category found"
                });
        }

        await categorymodel.findByIdAndDelete(id);
        res.status(200).send({
            status:true,
            message:"category Deleted Successfully",
        });
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in getall category api",
            error
        });
    }
};
module.exports={createcontroller,getallcontroller,updatecategory,deletecategory};