import React, { useState } from "react";
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import asyncHandler from "express-async-handler";
import axios from "axios";
import Button from "react-bootstrap/esm/Button";
import Api from "../../services/axios";
import { useDispatch } from "react-redux";
import { setAdminCredentials, setCredentials } from "../../store/slices/authSlice";

const AdminLogin = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
  
  
  
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          toast.error("Enter valid email");
          return;
        } else if (password.trim().length < 6) {
          toast.error("Enter password with minimum 6 characters");
          return;
        }
  
        const res = await Api.post("/admin/login", { email, password });
        console.log('res',res);
        if (res.data.status) {
          dispatch(setAdminCredentials(res.data))
          navigate('/admin/dashboard');
          toast.success("Logged in successfully..");
       } else {
          toast.error(res.data.message);
       }

        
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <>
    <MDBContainer className="p-1 my-5 d-flex flex-column w-25 border border-2 p-4">
    <h1 className="fs-2 d-flex flex-column align-items-center">LOGIN</h1>

    <form onSubmit={handleSubmit}>
      <MDBInput
        wrapperClass="mb-3"
        placeholder="Email address"
        id="form1"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <MDBInput
        wrapperClass="mb-3"
        placeholder="Password"
        id="form2"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button className="w-100 bg-dark" type="submit">
        LOGIN
      </Button>

      <div className="text-center">
       
      </div>
    </form>
  </MDBContainer>
</>
  )
}

export default AdminLogin



