import React, { Fragment, useEffect, useState } from 'react'
import "./style.css"
import MainNavbar from './MainNavbar';
import axios from "axios"
import Restaurants from './Restaurants';
import Footer from '../Footer';
import Loading from '../Components/Loading';

const Home = ({ price }) => {
  const [apiData, setapiData] = useState([])
  const [loading, setLoading] = useState(true);
  useEffect(() => {
 
    const fetchData = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/home`);
        if (response.data) {
          setapiData(response.data);
        } else {
          alert("data not found");
        }
      } catch (error) {
        alert("Something went wrong while fetching admin data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>

      <MainNavbar />
      <div className='home-container'>
        <div>
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

         {
           loading ?  <div className='admin-loading'><Loading /></div> :<Restaurants menuData={apiData} /> 
          
           
        } 
        </section>
      </div>


      <Footer />
    </>
  );
};

export default Home
