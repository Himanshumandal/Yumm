const mongoose=require("mongoose");
//schema
const orderschema=new mongoose.Schema({
    foods:[
        {type : mongoose.Schema.Types.ObjectId,
        ref:'foods'}
        ],
        payment :{},
        buyer:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        },
        status:{
            type:String,
            enum:['preparing','prepare','on the way','delivery'],
            default:'preparing',
        },
},{timestamps:true});

//export
module.exports=mongoose.model("orders",orderschema);