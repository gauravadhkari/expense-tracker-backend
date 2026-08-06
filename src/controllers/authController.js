const bcrypt = require("bcryptjs")
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const asyncHandler = require("../utils/asyncHandler")
const { validationResult } = require("express-validator")
const signup = asyncHandler(async (req,res) => {
    const {name , email , password} = req.body;
    const errors = validationResult(req);
       if(!errors.isEmpty()){
         return res.status(400).json({
           success:false,
           errors:errors.array()
         })
       }
    //VALIDATION
     if(!name || !email || !password){
      return res.status(400).json({
        success : false,
        message : "All fields are required.."
      })
    }
    
    //CHECKING IF USER ALREADY EXISTS
    const existingUser = await User.findOne({email});
    if(existingUser){
      return res.status(400).json({
        success : false,
        message : "User Already Exists...."
      })
    }
    //HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE USER
    const user = await User.create({
      name,
      email,
      password : hashedPassword
    })
    console.log("User",user);
    res.status(201).json({
      success : true,
      message : "User Created Successfully...",
      user
    });
});
const login = asyncHandler(async (req,res) => {
    const { email , password} = req.body;
     
    //VALIDATION
     if(!email || !password){
      return res.status(400).json({
        success : false,
        message : "Emails and Passwords are required.."
      })
    }
    //CHECKING IF USER  EXISTS
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({
        success : false,
        message : "User not found...."
      })
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
      return res.status(401).json({
        success : false,
        message : "Invalid Credentials.."
      })
    }
    const token = jwt.sign(
      {
        id : user._id, // PAYLOAD
        email : user.email,
        name : user.name
      },
      process.env.JWT_SECRET, // SECRET KEY
      {
        expiresIn : "7d"   // OPTIONS
      } 
    );
    res.status(200).json({
      success : true,
      message : "Login SuccessFully!",
      token
    });
});
module.exports = { signup,login }