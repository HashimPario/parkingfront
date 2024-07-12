import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from '../screen/login';
import Register from '../screen/register';
import Dashboard from '../screen/dashboard';
import Allparking from '../screen/allparking';
import Users from '../screen/users';
import Profile from '../screen/profile';
import UserParking from '../screen/userparking';
import PrivateRoutes from './privateRoute';
import AuthPrivateRoutes from './authPrivateRoute';
import MyBookings from '../screen/mybookings';

const AppRoute = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<AuthPrivateRoutes />}>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<PrivateRoutes />}>  
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/allparking" element={<Allparking />} />
            <Route path="/users" element={<Users />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/userparking" element={<UserParking />} />
            <Route path="/mybookings" element={<MyBookings />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default AppRoute;
