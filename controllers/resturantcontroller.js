const resturantmodel = require("../models/resturantmodel.js");

const createcontroller=async(req,res)=>{
    try{
        const{
            title,
            imageurl,
            foods,
            time,
            pickup,
            delivery,
            isopen,
            logurl,
            rating,
            ratingcount,
            code,
            coords,
        }=req.body;
        //validation
        if(!title ||!coords)
        {
            res.status(500).send({
                status:false,
                message:"Please Provide all details"
            });
        }
         const newresturant=new resturantmodel({
            title,
            imageurl,
            foods,
            time,
            pickup,
            delivery,
            isopen,
            logurl,
            rating,
            ratingcount,
            code,
            coords,
         })
         await newresturant.save();
         res.status(201).send({
            status:true,
            message:"new resturant created",
            newresturant
         });
    }

    catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in create Resturant api",
            error
        });
    }
};

//Getall resturant
const getallresturantcontroller=async(req,res)=>{
    try {
        const resturant=await resturantmodel.find({});
        if(!resturant)
        {
            return res.status(500).send({
                status:false,
                message:"error in resturant "
            })
        }
        res.status(200).send({
            success:true,
            totalcount:resturant.length,
            resturant
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in getall Resturant api",
            error
        });
    }
};

//get resturant by id
const getrestaurant=async(req,res)=>{
    try
    {
        const resturantid=req.params.id;
        //find resturant
        const resturant=await resturantmodel.findById(resturantid);
        if(!resturant)
        {
            return res.status(500).send({
                status:false,
                message:"error in id resturant "
            });
        }
        res.status(200).send({
            status:true,
            message:"get that particular resturant by id",
            resturant
        });
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in get Resturant api",
            error
        });
    }
};

//delete resturant
const deleteresturant=async(req,res)=>{
    try {
        const resturantid=req.params.id;
        //validation
        if(!resturantid)
        {
            return res.status(404).send({
                status:false,
                message:"No resturant found or provide resturant Id "
            });
        }
        //find resturant
        const resturant=await resturantmodel.findByIdAndDelete(resturantid);
        
        res.status(200).send({
            status:true,
            message:"Resturant Deleted Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in delete Resturant api",
            error
        });
    }
};


//exports
module.exports={createcontroller,getallresturantcontroller,getrestaurant,deleteresturant};