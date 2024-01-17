import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    MDBContainer,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBIcon,
  } from "mdb-react-ui-kit";
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Api from '../../../services/axios';


const AddUser = () => {
    const [error, setError] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
  
  
    const navigate = useNavigate();
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
        if (name.trim().length < 1) {
         toast.error("Enter a valid username");
          return;
        } else if (!emailRegex.test(email)) {
          toast.error("Enter valid email");
          return;
        } else if (password.trim().length < 6) {
          toast.error("Enter password with minimum 6 characters");
          return;
        } else if (password !== cpassword) {
          toast.error("Passwords don't match");
          return;
        }
  
        const res = await Api.post('/admin/addUser',{name,email,password,cpassword})
        console.log(res);
        if(res.data.status){
          navigate('/admin/dashboard')
          toast.success("user added  successfully")
        }
        else{
          toast.error(res.data.message)
        }
  
      } catch (error) {
        console.error(error);
        setError("An error occurred during registration");
      } finally {
       
        setError(null);
      }
    };
  return (
    
    <MDBContainer className="p-1 my-5 d-flex flex-column w-25 border border-1 border-dark p-3">
    <h2 className=" mb-2 d-flex flex-column align-items-center fs-3">
      ADD USER
    </h2>
      <form  onSubmit={handleSubmit}>
        <MDBInput
          wrapperClass="mb-2"
          placeholder="Name"
          id="form1"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <MDBInput
          wrapperClass="mb-2"
          placeholder="Email"
          id="form2"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <MDBInput
          wrapperClass="mb-2"
          placeholder="Password"
          id="form4"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <MDBInput
          wrapperClass="mb-2"
          placeholder="Repeat Password"
          id="form5"
          type="password"
          value={cpassword}
          onChange={(e) => setCPassword(e.target.value)}
        />


        <Button className="w-100 bg-dark" type="submit">ADD USER</Button>

      
      </form>
    </MDBContainer>
  )
}

export default AddUser