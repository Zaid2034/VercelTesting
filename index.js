const express = require ('express');
const app = express ();
app.use(express.json())
// const cors = require ('cors');
// app.use(cors())

const {User, TrackingToken} = require ('./db');


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