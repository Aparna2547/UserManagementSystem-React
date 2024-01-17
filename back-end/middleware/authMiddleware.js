import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler ( async(req,res,next)=>{
    console.log('token inside');
    let token ;
    token = req.cookies.user;

    if(token){
        try{
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId).select('-paasword');
            next();


        }catch(error){
            res.status(401);
            throw new Error("nor authorized, no token")
        
        }
    }else{
        res.status(401);
        throw new Error("nor authorized, no token")
    }
})

export {protect}