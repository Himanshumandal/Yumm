const express=require('express')
const colors=require('colors')
const cors=require('cors')
const morgan=require('morgan')
const dotenv=require('dotenv')
const connectdb = require('./config/db')



//dot env configuration
dotenv.config();

// db connection
connectdb();


//rest object
const app=express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//route
app.get("/",(req,res)=>{
    return res.status(200).send("<h1>Wecolme to food server </h1>");
});

app.use('/api/v1',require("./routes/testroutes"));
app.use('/api/v1',require("./routes/registerroutes"));
app.use('/api/v1',require("./routes/userroute"));
app.use('/api/v1',require("./routes/resturantroutes"));
app.use('/api/v1',require("./routes/categoryroutes"));
app.use('/api/v1',require("./routes/foodroutes"));

//port
const port=process.env.port||8080;

//listen
app.listen(port,()=>
{
    console.log(`server running ${port}`.bgMagenta.white);
});

