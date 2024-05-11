import React, { Fragment, useEffect, useReducer, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import "./style.css"
import MainNavbar from './MainNavbar';
import axios from "axios"
import Restaurants from './Restaurants';
import Navbar from '../Components/Navbar';

const Home = ({ price }) => {
  const [apiData, setapiData] = useState([])
  const [login, setLogin] = useState(false)

  useEffect(() => {
    axios.post("http://localhost:8000/home")
      .then(res => {
        if (res.data) {
          let data = res.data;
         
          setapiData(data);

        } else if (res.data === "notexist") {
          alert("User has not signed up");
        }
      })
      .catch(e => {
        alert("");
        alert("wrong details")
      });
  }, []);

  return (
    <>
    {/* <Navbar></Navbar> */}
      <MainNavbar  />
      <div className='home-container'>
        <div className='home-main'>
          <h1>Sweetly</h1>
          <h2>Order Your Favourite Foods...</h2>
          <div>
            <a href="#data">Order Now</a>
          </div>
        </div>
        <img src="./images/poster2.png" alt="" className='home-poster' />
      </div>

      <section id='data'>

        <Restaurants menuData={apiData}/>
      </section>
    </>
  );
};

export default Home
