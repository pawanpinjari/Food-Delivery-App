import React, { useEffect, useState } from 'react'
import MainNavbar from './MainNavbar'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import MenuCard from './MenuCard'

const MenuData = () => {
  const location=useLocation()
  const[data,setData]=useState()
  // console.log("logData",location.state.LogData)
  const LogData=location.state.LogData;
  const Login=location.state.Login
  useEffect(() => {
    const name=location.state.name;
     
        try {
            axios.post("http://localhost:8000/allData",{name})
                .then(res => {
                    if (res.data) {
                        setData(res.data);
                        console.log("data",res.data)
                    } else {
                        console.log("data not found");
                    }
                })
                .catch(e => {
                    console.log("error", e);
                });
        } catch (e) {
            console.log("error", e);
        }
    }, []);
  return (
    <div>
        <MainNavbar LogData={LogData} Login={Login}  />
        {
          data && <MenuCard restName={location.state.name}  menuData={data} LogData={LogData} Login={Login}></MenuCard>
        }
      
    </div>
  )
}

export default MenuData
