import React from "react";
import Header from "../../components/user/Header/Header";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {

const {userInfo} = useSelector((state)=>state.auth)
console.log(userInfo);

  return (
    <div>
      <Header />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "90vh" }}
      >
        <div>
          { userInfo ?
            <div className="border border-1 border-dark p-5">
            <h3 className="text-dark mb-3 text-center">WELCOME TO DASHBOARD</h3>
            <div className="d-flex gap-4">
              <div style={{width:'10rem'}}>
                <img
                src={ userInfo.image ?
                  userInfo.image
                  :
                  'https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0='}
                  alt="image" className="img-fluid"
                />
              </div>
              <div>
                <h5>Name: {userInfo.name} </h5>
                <h5>Email: {userInfo.email}</h5>
              </div>
            </div>
          </div>
          :
          <div className="border border-1 border-dark p-5">
            <h3 className="mb-3">USER MANAGEMENT SYSTEM USING REACT</h3>
            <div className="d-flex gap-2 w-100 justify-content-center">
              <Link to="/login" className="btn btn-dark">
                Login
              </Link>
              <Link to="/signup" className="btn btn-dark">
                SignUp
              </Link>
            </div>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default Home;
