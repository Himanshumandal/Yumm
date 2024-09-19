const mongoose=require('mongoose')


//schema
const categoryschema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"category title is required"],
    },
    imageurl:{
        type:String,
        default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Dcategory%2Bicon&psig=AOvVaw1TXdo_ITPRqnbSZZ81wFML&ust=1713873620337000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOCykPbi1YUDFQAAAAAdAAAAABAE"
    },

 } ,{timestamps:true});

//export
module.exports=mongoose.model('category',categoryschema);