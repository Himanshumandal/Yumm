const foodmodel = require("../models/foodmodel");
const ordermodel=require("../models/ordermodel");

const createfood=async(req,res)=>{
    try{
        const {title,description,price,imageurl,foodtags,category,code,isavailable,resturant,rating}=req.body;
        if(!title || !description || !price || !resturant){
            return res.status(500).send({
                success:false,
                message:"Please Provide all fields"
            });
        }
        const newfood=new foodmodel({
            title,
            description,
            price,
            imageurl,
            foodtags,
            category,
            code,
            isavailable,
            resturant,
            rating
        });
        await newfood.save();
        res.status(201).send({
            success:true,
            message:"new food item created",
            newfood,
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in create food api",
            error,
        });
    }
};

const getallfood=async(req,res)=>{
    try{
        const getallfood=await foodmodel.find({});
        if(!getallfood)
        {
            return res.status(500).send({
                status:false,
                message:"error in resturant "
            })
        }
        res.status(200).send({
            success:true,
            totalcount:getallfood.length,
            getallfood
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in all food api",
            error,
    });

    }
}

const getsinglefood=async(req,res)=>{
    try{
        const foodid=req.params.id
        if(!foodid){
            return res.status(404).send({
                success:false,
                message:'please provide id'
            })
        }
        const food=await foodmodel.findById(foodid)
        if(!food)
        {
            return res.status(404).send({
                success:false,
                message:"NO food found with id"
            });
        }
        res.status(200).send({
            success:true,
            food,
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in single food api",
            error,
    });

    }
}

const updatefood=async(req,res)=>{
    try{
        const foodid=req.params.id;
        if(!foodid){
            return res.status(404).send({
                success:false,
                message:'no food id was found'
            })
        }
        const food=await foodmodel.findById(foodid);
        if(!food){
            return res.status(404).send({
                success:false,
                message:"No food found"
            })
        }
        const { title,
            description,
            price,
            imageurl,
            foodtags,
            category,
            code,
            isavailable,
            resturant,
            rating}=req.body
            const updatefood=await foodmodel.findByIdAndUpdate(foodid,{
                title,
                description,
                price,
                imageurl,
                foodtags,
                category,
                code,
                isavailable,
                resturant,
                rating
            },{new:true})
            res.status(200).send({
                success:true,
                message:"food is updated "
            })
    }
    catch(error){
        console.log(error);
        res.status(404).send({
            success:false,
            message:"error in update api"
        });
    }
}

//delete food
const deletefood=async(req,res)=>{
    try{
        const deleteid=req.params.id;
        //validation
        if(!deleteid)
        {
            return res.status(404).send({
                status:false,
                message:"No resturant found or provide resturant Id "
            });
        }
        //find resturant
        const fooddelete=await foodmodel.findByIdAndDelete(deleteid);
        
        res.status(200).send({
            status:true,
            message:"food Deleted Successfully",
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error delete api"
        });
    }
}

const placeorder=async(req,res,next)=>{
    try{
        const {cart}=req.body;
        if(!cart ){
            return res.status(500).send({
                success:false,
                message:'Please food cart or '
            });
        }
            let total=0;
            //cal
            cart.map((i)=>{
                total+=i.price
            });
        const neworder=new ordermodel({
            foods:cart,
            payment:total,
            buyer:req.body.id
        });
        await neworder.save();
        res.status(201).send({
            success:true,
            message:"order is successfully created",
            neworder,
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in order api",
            error
        });
    }
}

//orderstatus
const orderstatus=async(req,res)=>{
    try{
        const orderid=req.params.id;
        if(!orderid){
            return res.status.send({
                success:false,
                message:'please provide valid order'
            });
        }
        const {status}=req.body
        const order=await ordermodel.findByIdAndUpdate(orderid,{status},{new:true});
        res.status(200).send({
            success:true,
            message:'order status updated',
            order,
        });

    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in orderstatus api",
            error
        })
    }
}


module.exports={createfood,getallfood,getsinglefood,updatefood,deletefood,placeorder,orderstatus};