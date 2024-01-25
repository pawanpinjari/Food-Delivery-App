import React, {Fragment, useEffect, useReducer, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import "./style.css"
// import Menu from "./menuApi"
import MenuCard from './MenuCard'
import Navbar from './Navbar';
import MainNavbar from './MainNavbar';
// import Cart from './Cart';
import axios from "axios"
import Restaurants from './Restaurants';
// import Login from '../User/Login';



const Home = ({price}) => {
  const location=useLocation()
  const[apiData,setapiData]=useState([])
  const [menuData, setMenuData] = useState();
  const[allData,setAlldata]=useState();
  const [login, setLogin] = useState(false)
  const [profileData,setProfileData]=useState([])
  

  useEffect(() => {
    
    // const logData = location.state?.data;
    const log = location.state?.login;
    setProfileData(location.state?.data)
    setLogin(log)
   
  }, [location.state]);
    useEffect(() => {
      axios.post("http://localhost:8000/home")
        .then(res => {
          if (res.data) {
            let data = res.data;
            console.log(data)
            setapiData(data);
            setAlldata(data)
            const uniqueList = [
              ...new Set(data.map((curElem) => curElem.category)),
              "All",
            ];
            setMenuData(uniqueList);
          } else if (res.data === "notexist") {
            alert("User has not signed up");
          }
        })
        .catch(e => {
          alert(e);
          console.log("data", e);
        });
    }, []);
    

  

  const filterItem = (category) => {
    if (category == "All") {
      setapiData(allData);
      
      return;
      
    }

    const updatedList = allData.filter((curElem) => {
      return curElem.category === category;
    });

    setapiData(updatedList);
  };

  return (
    <>
    <MainNavbar  Login={login} LogData={profileData}/>
    <div className='home-container'>
      <div className='home-main'>
        <h1>Sweetly</h1>
        <h2>Order Your Favourite Foods...</h2>
        <div>
          {/* <button >Oerder now</button> */}
          <a href="#data">Order Now</a>
        </div>
      </div>
      <img src="./images/poster2.png" alt="" className='home-poster'/>
    </div>
   
    {/* {menuData && <Navbar filterItem={filterItem} menuList={menuData} />} */}
    <section id='data'>
    {/* <MenuCard menuData={apiData} /> */}
    <Restaurants menuData={apiData} Login={login} LogData={profileData}/>
    </section>
      
    
    </>
  );
};

export default Home
