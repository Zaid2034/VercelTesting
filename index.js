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

const signUpSchema = zod.object ({
  email: zod.string (),
  username: zod.string (),
  password: zod.string (),
});

app.get('/',async(req,res)=>{
    const user=await User.findOne({
        username:"zaid567"
    })
    console.log(user)
    res.json({
        "message":user
    })
})
app.post ('/signup', async (req, res) => {
  console.log ('In signup');
  console.log ('jwt secret is:', JWT_SECRET);
  try {
    const body = req.body;
    const {success} = signUpSchema.safeParse (req.body);
    if (!success) {
      return res.json ({
        message: 'Email already taken/ Incorrect inputs',
      });
    }
    const user = await User.findOne ({
      username: body.username,
    });

    if (user) {
      return res.json ({
        message: 'Email already taken/ Incorrect inputs',
      });
    }
    const dbUser = await User.create (body);
    console.log ('db user:', dbUser.id);
    const token = jwt.sign (
      {
        userId: dbUser._id,
      },
      JWT_SECRET
    );
    res.json ({
      message: 'User created successfully',
      token: token,
    });
  } catch (error) {
    console.log (error);
  }
});

app.listen(3000,()=>{
    console.log("Server is running")
})