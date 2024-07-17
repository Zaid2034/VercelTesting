const express = require ('express');
const app = express ();
app.use(express.json())
const cors = require ('cors');
const zod = require ('zod');
const {User, TrackingToken} = require ('./db');
const jwt = require ('jsonwebtoken');
const dotenv = require ('dotenv');
// app.use(cors())
dotenv.config ();
const JWT_SECRET = process.env.JWT_SECRET;

app.use (
  cors ({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  })
);

app.get('/',async(req,res)=>{
    res.json({
        "message":"Hello World"
    })
})
const signUpSchema = zod.object ({
  email: zod.string (),
  username: zod.string (),
  password: zod.string (),
});
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