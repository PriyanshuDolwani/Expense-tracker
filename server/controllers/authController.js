const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    console.log('registerUser body:', req.body);
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all fields",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(
      password,
      salt
    );

    // Create user
    const user = await User.create({
      name,
      email,
      username: email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('registerUser error:', error);
    // Handle Mongo duplicate key error (E11000)
    if (error && (error.code === 11000 || error.name === 'MongoServerError')) {
      // Extract field from error message if possible
      const key = error.keyValue ? Object.keys(error.keyValue)[0] : null;
      const message = key
        ? `Duplicate value for field: ${key}`
        : 'Duplicate key error';
      return res.status(400).json({ success: false, message });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const loginUser = async(req,res)=>{
    try {
        const {email,password}=req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please provide all fields",
            });
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({
                success:false,
                message:"Invalid credentials",
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if(!isMatch){
            return res.status(401).json({
                success:false,
                message:"Invalid credentials",
            });
        }

        const token = jwt.sign(
            {
                id:user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"7d",
            }
        );

        res.status(200).json({
            success: true,
            token,
            data:{
                _id:user._id,
                name:user.name,
                email:user.email,
            },
        });
    } catch (error) {
        console.error('loginUser error:', error);
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

module.exports={registerUser,loginUser};