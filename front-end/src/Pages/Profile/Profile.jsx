import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import Button from "react-bootstrap/esm/Button";
import { set } from "mongoose";
import Header from "../../components/user/Header/Header";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import Api from "../../services/axios";
import { setCredentials } from "../../store/slices/authSlice";

const Profile = () => {
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [image, setImage]= useState('')
  const navigate = useNavigate();

  const {userInfo} = useSelector((state)=>state.auth);
  const dispatch = useDispatch()

  useEffect(()=>{
      setName(userInfo.name)
      setEmail(userInfo.email)
  },[])


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData  = new FormData();
    formData.append('name',name)
    formData.append('email',email)
    formData.append('password',password)
    formData.append('image',image)


    // console.log(image);
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (name.length < 1) {
        toast.error("Enter a valid username");
        return;
      } else if (!emailRegex.test(email)) {
        toast.error("Enter valid email");
        return;
      
      }else if (password !== cpassword) {
        toast.error("Passwords don't match");
        return;
      }
      const res=await Api.put(`/users/updatedProfile?id=${userInfo._id}`,formData)
      console.log(res);
      if(res.data.status){
        dispatch(setCredentials(res.data))
        toast.success('profile updated successfully')
      navigate("/");

      }

    } catch (error) {
      console.error(error);
      setError("An error occurred during registration");
    } finally {
      setError(null);
    }
  };
  return (
    <>
      <Header />
      <div className="d-flex justify-content-center align-items-center " style={{height:"90vh"}}>
      <div className="border border-1 border-dark p-4">
        
        <h1 className="mt-2 mb-0 d-flex flex-column align-items-center fs-3">
          EDIT USER DETAILS
        </h1>
        <MDBContainer className="p-1 my-1 d-flex flex-column">
          <form action="" onSubmit={handleSubmit}>
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
            <div>
              <input type="file"
              name='image'
              onChange={(e)=>setImage(e.target.files[0])}
               />
            </div>

            <div className="d-flex justify-content-between mx-3 mb-4">
              <p className="text-center text-danger">{error}</p>
            </div>
            <Button className="w-100 bg-dark" type='submit'>EDIT</Button>
          </form>
        </MDBContainer>
      </div>
      </div>
    </>
  );
};

export default Profile;
