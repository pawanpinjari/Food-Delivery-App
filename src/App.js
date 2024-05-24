import React from 'react';
import './App.css';
import Home from './User/Home';
import { Navigate, Route, Routes } from 'react-router-dom';
import Cart from './User/Cart';
import Payment from './User/Payment';
import Login from './User/Login';
import Signup from './User/Signup';
import Restaurant from './Restaurants/Restaurant';
import HotelLogin from './Restaurants/HotelLogin';
import HotelSignup from './Restaurants/HotelSignup';
import MainNavbar from './User/MainNavbar';
import MenuData from './User/MenuData';
import Print from './Restaurants/Print';
import AdminLogin from './Admin/AdminLogin';
import AdminHome from './Admin/AdminHome';
import { useSelector } from 'react-redux';

function App() {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menuData" element={<MenuData />} />
        
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/restaurant"
          element={
            isLoggedIn ? <Restaurant /> : <Navigate to="/rest_login" />
          }
        />

        <Route path="/rest_login" element={<HotelLogin />} />
        <Route path="/rest_signup" element={<HotelSignup />} />
        <Route path="/mainnavbar" element={<MainNavbar />} />
        <Route path="/print" element={<Print />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            isLoggedIn ? <AdminHome /> : <Navigate to="/admin-login" />
          }
        />
      </Routes>
    </>
  );
}

export default App;
