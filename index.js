const express = require ('express');
const app = express ();
app.use(express.json())
const cors = require ('cors');

app.use (
  cors ({
    origin: '*',
  })
);

app.get('/',async(req,res)=>{
    res.json({
        "message":"Hello World"
    })
})

app.listen(3000,()=>{
    console.log("Server is running")
})