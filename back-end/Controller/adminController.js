import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { json } from "express";

const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
console.log(email,password);
  if (!email || !password) {
    res.status(400).json({ status: false, message: "Invalid credentials" });
    throw new Error("Email or password not provided");
  }
  console.log('hiiii')

  const admin = await Admin.findOne({ email });

  if (admin && admin.password == req.body.password) {
    generateToken(res, admin._id,'admin');
    res.status(201).json({
      status: true,
      _id: admin._id,
      email: admin.email,
      message: "Logged in successfully",
    });
  } else {
    res.status(401).json({ status: false, message: "Invalid credentials" });
    throw new Error("Invalid email or password");
  }
});

const addUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    const hashedPassword = await bcrypt.hash(password, 10);
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({status:false, message: "user already exist" });
    } else {
      const addUser = new User({
        name,
        email,
        password: hashedPassword,
      });
      await addUser.save();
      res.status(201).json({status:true, message: "user added succesfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({status:false, message: "Error creating user" });
  }
});

//get user details for edit
const getUser = asyncHandler(async(req,res)=>{
  const userId = req.params.id;
  if(userId){
    const user = await User.findById({_id:userId})
    console.log(user);
    res.status(200).json({user});
  }
})


//show all users

const users = async (req, res) => {
  try {
    const search = req.query.search || "";
    console.log("Search Term:", search);
    
    // If no search query is provided, fetch all users
    const userData = search
      ? await User.find({
          $or: [
            { name: { $regex: '^' + search, $options: "i" } },
            { email: { $regex: '^' + search, $options: "i" } }
          ]
        })
      : await User.find({});

    res.json({ userData });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};





//edit user
const editUser = asyncHandler(async (req, res) => {
  try {
    console.log("backend called");
    const { name, email } = req.body;
    const { id } = req.query;

    const user = await User.findById(id)

    if(user){
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email

    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password,10)
       user.password=hashedPassword
    }

    const editUser = await user.save();

    res.status(200).json({
      status:true,
      _id:editUser._id,
      name:editUser.name,
      email:editUser.email
    });
  }else{
    res.status(404).json({message:'user not found'})
  }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Delete user controller
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params; // Use destructuring directly for userId
    console.log("User ID:", userId);
    
    const user = await User.findById(userId)
    console.log(user);

    await User.findByIdAndDelete(userId);

 
    res.json({ status:true, message: 'User deleted successfully' });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



//block unblock user

const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.query;
  console.log(id);
  const user = await User.findById(id);
  try {
    if (user.isBlocked === false) {
      await User.updateOne({ _id: id }, { $set: { isBlocked: true } });
      res.status(201).json({ message: "updated successsfully" });
    } else {
      await User.updateOne({ _id: id }, { $set: { isBlocked: false } });
      res.status(201).json({ message: "updated successsfully" });
    }
  } catch (error) {
    res.status(400).json({ message: "something error" });
  }
});

//logout
const logoutAdmin = asyncHandler(async (req, res) => {
  console.log('kaa');
  res.cookie("admin",'', {
    httpOnly: true,
    expires: new Date(0),
  });
  
  res.status(200).json({status:true, message: "User logged out" });
});
export { authAdmin, logoutAdmin, addUser, editUser,deleteUser, blockUser,users ,getUser};
