

const testcontroller=(req,res)=>{
    try{
        res.status(200).send({
            success:true,
            message:'test user data api',
        })
    }
    catch(error)
    {
        console.log("error in test app",error);
        res.status(500).send({
            success:false,
            message:"test api error"
        });
    }
}
module.exports={testcontroller};