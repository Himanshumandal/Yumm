const mongoose=require('mongoose')


//schema
const resturantschema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Resturant title is required"],
    },
    imageurl:
    {
        type:String,
    },
    foods:{type:Array},
    time:{
        type:String,
    },
    pickup:{
        type:Boolean,
        default:true,
    },
    delivery:{
        type:Boolean,
        default:true,
    },
    isopen:{
        type:Boolean,
        default:true,
    },
    logourl:{
        type:String,
    },
    rating:{
        type:Number,
        default:1,
        min:1,
        max:5,
    },
    ratingcount:{
        type:String,
    },
    code:{
        type:String,
    },
    coords:{
        id:{type:String},
        latitude:{type:Number},
        latitudedelta:{type:Number},
        longitude:{type:Number},
        longitudedelta:{type:Number},
        address:{type:String},
        title:{type:String},
    },

 } ,{timestamps:true});

//export
module.exports=mongoose.model('resturant',resturantschema);