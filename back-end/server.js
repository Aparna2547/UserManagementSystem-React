import express from  'express';
const app =express();

import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
const port = process.env.PORT ||5000;
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import userRoute from './routes/userRoute.js'
import adminRoute from './routes/adminRoute.js';
import connectDB from './config/db.js';
import cors from 'cors'



connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin:'http://localhost:3000',
        methods:'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials:true
    })
)

app.use(cookieParser());


app.use('/api/users',userRoute)
app.use('/api/admin',adminRoute);
// app.use('/',(req,res)=>res.send("server is ready"))
app.get('/',(req,res)=>res.send("server is ready"))


app.use(notFound)
app.use(errorHandler)
app.listen (port,()=>console.log(`Server started at port ${port}`));
