const mongoose=require('mongoose')
const colors=require('colors')

//function mongodb database connection
const connectdb =async(req,res)=>{
    try{
        await mongoose.connect(process.env.mongourl)
        console.log(`connect to database${mongoose.connection.host}`.bgCyan)
    }
    catch(error)
    {
        console.log('db error',error)
    }
};
module.exports=connectdb;
