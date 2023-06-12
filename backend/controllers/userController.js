const { User,validateUser } = require('../models/userModel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const signUp = async (req,res) => {
    
    const { name, email, password } = req.body;

    const {error} = validateUser({name,email,password});
    if(error) {
        return res.status(400).json({
            error: error.details[0].message 
        });
    }

    const existingUser = await User.findOne({ email });  
    if (existingUser){
        return res.status(400).json({
            error: "An account with this email already exists."
        });
    }
    
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
        name,
        email,
        password : hashPassword,
    });

    const savedUser = await newUser.save();


    // sign the token
    const token = jwt.sign(
        {
            _id: savedUser._id,
            userEmail : savedUser.email,
            role : savedUser.role
        },
        process.env.JWT_SECRET_KEY

    );

    // send the token in a HTTP-only cookie
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        });
    
    return res.status(201).json({ 
        message: 'User registered successfully',
        token: token 
    });
};




 const signIn =  async (req,res)=>{

    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password){
        return res.status(400).json({ 
            error: "Please enter all required fields." 
        });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser){
        return res.status(401).json({ 
            error: "Wrong email or password."
        });
    }

    const correntPassword = await bcrypt.compare(password, existingUser.password);

    if (!correntPassword)
        return res.status(401).json({ 
        error: "Wrong email or password." 
    });

    // sign the token
    const token = jwt.sign(
        {
            _id: existingUser._id,
            userEmail : existingUser.email,
            role : existingUser.role
        },
        process.env.JWT_SECRET_KEY
    );

    // send the token in a HTTP-only cookie

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        });
    
    return res.status(201).json({
        message: 'User login successfully', 
        token : token
    });
};


  module.exports = {
    signUp, signIn
  }