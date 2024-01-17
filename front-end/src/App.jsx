import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import Header from './components/user/Header/Header'
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import UserRoutes from './Routes/userRoutes';
import AdminRoutes from './Routes/adminRoutes';


function App() {

  return (
    <>
    <ToastContainer/>
    <Router>

    <Routes>
      <Route path='/*' element={<UserRoutes/>}/>
      <Route path='/admin/*' element={<AdminRoutes/>}/>
    </Routes>
    </Router>

    </>
  );
}

export default App;
