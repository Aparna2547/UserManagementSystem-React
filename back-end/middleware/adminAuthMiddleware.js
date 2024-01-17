import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import Admin from '../models/adminModel.js';

const protect = asyncHandler ( async(req,res,next)=>{
    console.log('token inside');
    let token ;
    token = req.cookies.admin;

    if(token){
        try{
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            req.user = await Admin.findById(decoded.adminId).select('-paasword');
            next();


        }catch(error){
            res.status(401);
            throw new Error("not authorized, no token");
        
        }
    }else{
        res.status(401);
        throw new Error("nor authorized, no token")
    }
})

export {protect}