import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import AdminDashBoard from "../Pages/AdminDashBoard/AdminDashBoard";
import AdminLogin from "../Pages/AdminDashBoard/AdminLogin";
import UserLoggedOut from "../components/user/UserLoggedOut";
import AddUser from "../components/admin/addUser/AddUser";
import EditUser from "../components/admin/EditUSer/EditUser";
import AdminProtect from "../components/admin/protect/AdminProtect";
import AdminLoggedOut from "../components/admin/protect/AdminLoggedOut";
const adminRoutes = () => {
  return (
    <Routes>
      <Route path='' element={<AdminLoggedOut/>}>
        <Route path="" element={<AdminLogin />} />
      </Route>

      <Route path="" element={<AdminProtect/>}>
        <Route path="dashboard" element={<AdminDashBoard />} />
        <Route path="adduser" element={<AddUser />}/>
        <Route path="edituser/:id" element={<EditUser />}/>
      </Route>

    </Routes>
  );
};

export default adminRoutes;
