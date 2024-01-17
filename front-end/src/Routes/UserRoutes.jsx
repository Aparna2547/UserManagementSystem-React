import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Profile from "../Pages/Profile/Profile";
import Home from "../Pages/Home/Home";
import UserProtect from "../components/user/UserProtect";
import { useSelector } from "react-redux";
import UserLoggedOut from "../components/user/UserLoggedOut";
import Error from "../components/Error/Error";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Home />} />

      <Route path="" element={<UserLoggedOut />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Register />} />
      </Route>

      <Route path="" element={<UserProtect />}>
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Error/>} />
    </Routes>
  );
};

export default UserRoutes;
