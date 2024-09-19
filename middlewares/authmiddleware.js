const jwt=require('jsonwebtoken');

module.exports=async(req,res,next)=>{
    try{
        //get token
        const token=req.headers["authorization"].split(" ")[1]
        jwt.verify(token,process.env.jwt_secret,(err,decode)=>
    {
        if(err)
        {
            return res.status(401).send({
                status:false,
                message:"un-authorize user"
            })
        }
        else{
            req.body.id=decode.id;
            next()
        }
    });
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send(
            {
                status:false,
                message:"Please Provide Auth token",
                error
            }
        );
    }
}