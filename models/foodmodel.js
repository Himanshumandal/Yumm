const mongoose =require("mongoose");

//schema
const foodschema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"food title is required"]
    },
    description:{
        type:String,
        required:[true,"food description is required"]
    },
    price:{
        type:Number,
        required:[true,"food price is required"]
    },
    imageurl:{
        type:String,
        default:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fuser-profile&psig=AOvVaw3hDdndPZZisWogdyYj_aN1&ust=1713719553083000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPCSmKml0YUDFQAAAAAdAAAAABAJ'
    },
    foodtags:{
        type:String,
    },
    category:{
        type:String,
    },
    code:{
        type:String,
    },
    isavailable:{
        type:Boolean,
        default:true,
    },
    resturant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'resturant'
    },
    rating:{
        type:Number,
        default:5,
        min:1,
        max:5
    },
    ratingcount:{
        type:String,
    },

},{timestamps:true});

module.exports=mongoose.model("foods",foodschema);