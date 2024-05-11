import React, { useEffect, useState } from 'react'
import MainNavbar from './MainNavbar'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import MenuCard from './MenuCard'
import { useSelector, useDispatch } from 'react-redux';

const MenuData = () => {
  const dispatch=useDispatch()
  const location=useLocation()
  const loginStatus = useSelector(state => state.isLoggedIn);
  const restId = useSelector(state => state.restId);
  const[data,setData]=useState()

  useEffect(() => {

        try {
            axios.post("http://localhost:8000/allItem",{restId})
                .then(res => {
                    if (res.data) {
                        setData(res.data);
                    } else {
                        alert("data not found");
                    }
                })
                .catch(e => {
                    alert("error", e);
                });
        } catch (e) {
            alert("error", e);
        }
    }, []);
  return (
    <div>
        <MainNavbar cart={true}/>
        {
          data && <MenuCard restId={restId}  menuData={data}></MenuCard>
        }
      
    </div>
  )
}

export default MenuData
