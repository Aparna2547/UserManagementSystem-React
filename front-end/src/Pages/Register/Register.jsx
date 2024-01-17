import React, { useState } from "react";
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
import Api from "../../services/axios";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/slices/authSlice";


function App() {

  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");


  const navigate = useNavigate();
  const dispatch  = useDispatch()


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

      const res = await Api.post('/users/registerAuth',{name,email,password,cpassword})
      console.log(res);
      if(res.data.status){
        dispatch(setCredentials(res.data))
        navigate('/')
        toast.success("signed up successfully")
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
    <>
      <Header />
    
      <MDBContainer className="p-1 my-5 d-flex flex-column w-25 border border-1 border-dark p-3">
      <h1 className=" mb-0 d-flex flex-column align-items-center fs-3">
        REGISTER
      </h1>
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

          <div className="d-flex justify-content-between mx-3 mb-4">
            {/* <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' /> */}
            <p className="text-center text-danger">{error}</p>
          </div>

          {/* <MDBBtn className="mb-0 w-100">Sign up</MDBBtn> */}
          <Button className="w-100 bg-dark" type="submit">Signup</Button>

          <div className="text-center">
            <p>
              Already have account ? <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </MDBContainer>
    </>
  );
}

export default App;
