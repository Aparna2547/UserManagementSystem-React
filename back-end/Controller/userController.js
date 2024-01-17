import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import generateToken from "../utils/generateToken.js";
import jwt from 'jsonwebtoken'


import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dr2avntwv', 
  api_key: '829874218365388', 
  api_secret: 'cZ_7TCeKD4mJf0Hj-CbfmvkXgks' 
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    res.status(200).message('Email and password are required')
    throw new Error('Email and password are required');
  }

  const user = await User.findOne({ email });

  if (user) {
    const hashedPassword = user.password;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (passwordMatch) {
      generateToken(res, user._id,'user');
      res.status(201).json({
        status:true,
        _id: user._id,
        name: user.name,
        email: user.email
      });
    } else {
      res.status(200).json({status:false,message:'invalid email or password'});
    }
  } else {
    res.status(200).json({status:false,message:'invalid email or password'});
  }
});



  //register
  const registerUser = asyncHandler(async (req, res) => {
    console.log('hello');
    const { name, email, password } = req.body;
    console.log(req.body);

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(200).json({status:false, message: "Email already exists" });
            return; 
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        if(user){
          generateToken(res,user._id,'user');
          res.status(201).json({
            status:true,
            _id: user._id,
            name: user.name,
            email: user.email
        });
        }else{
          res.status(400);
          throw new Error('Invalid user data')
        }
      
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: "Error creating user" });
    }
  });

//logout
const logoutUser = asyncHandler(async(req, res) => {
  res.cookie('user','',{
    httpOnly:true,
    expires:new Date(0)
  })
  res.status(200).json({ message: " user logged Out" });
});

// get user profile
const getUserProfile = asyncHandler((req, res) => {
  const user = {
    _id:req.user._id,
    name:req.user.name,
    email: req.user.email
  };

  // const token = req.cookies.jwt
  // const decoded = jwt.verify(token, process.env.JWT_SECRET);
  // console.log(decoded);
  
  res.status(200).json({ message: " User Profile" });
});

//update userProfile
const updateUserProfile = asyncHandler(async (req, res) => {
  try {
    console.log('laaa');
    const {id} = req.query
    const user = await User.findById(id);
    console.log('User:', user);
    const image= req.file

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      
      if(image){
        let result = await cloudinary.uploader.upload(image.path)
        user.image = result.secure_url
      }else{
        user.image = user.image
      }
     

      if (req.body.password) {
       const hashedPassword = await bcrypt.hash(req.body.password,10)
        user.password=hashedPassword
     }

      const updatedUser = await user.save();
      console.log('Updated User:', updatedUser);

      res.status(200).json({
        status:true,
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        image:updatedUser.image
      });
    } else {
      res.status(404)
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// const updateUserProfile = asyncHandler(async(req, res) => {
//   const user = await User.findById(req.user._id);
//   if(user){
//     user.name = req.body.name || user.name;
//     user.email = req.body.email || user.email;

//     if(req.body.password){
//       user.password = req.body.password;
//     }
//     const updatedUser =  await user.save();
//     res.status(200).json({
//       _id:updatedUser._id,
//       name:updatedUser.name,
//       email:updatedUser.email,
//     })
//   }
//   else{
//    res.status(404);
//     throw new Error('User not found')
//   }
//   res.status(200).json({ message: "update User Profile" });
// });

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
