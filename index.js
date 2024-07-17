const express = require ('express');
const app = express ();
app.use(express.json())
// const cors = require ('cors');
// app.use(cors())
const zod = require ('zod');
const jwt = require ('jsonwebtoken');
const dotenv = require ('dotenv');
const {User, TrackingToken} = require ('./db');
dotenv.config ();
const JWT_SECRET = process.env.JWT_SECRET;

app.get('/',async(req,res)=>{
    const user=await User.findOne({
        username:"zaid567"
    })
    console.log(user)
    res.json({
        "message":user
    })
})
app.listen(3000,()=>{
    console.log("Server is running")
})