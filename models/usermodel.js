const mongoose=require('mongoose')


//schema
const userschema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,'user name is required']
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    address:{
        type:Array
    },
    phone:{
        type:String,
        required:[true,'phone numberis required']
    },
    usertype:{
        type:String,
        required:[true,'user type is required'],
        default:'client',
        enum:['client','admin','vendor','driver']
    },
    profile:{
        type:String,
        default:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fuser-profile&psig=AOvVaw3hDdndPZZisWogdyYj_aN1&ust=1713719553083000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPCSmKml0YUDFQAAAAAdAAAAABAJ'
    }
},{timestamps:true});

//export
module.exports=mongoose.model('user',userschema);