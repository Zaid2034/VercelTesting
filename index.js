const express = require ('express');
const app = express ();

app.use(express.json())

app.get('/',(req,res)=>{
    res.json({
        "message":"hello world"
    })
})
app.listen(3000,()=>{
    console.log("Server is running")
})