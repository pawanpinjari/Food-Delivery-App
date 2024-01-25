import React, { useEffect, useState } from 'react'
import NavRest from './NavRest'
import { useLocation } from 'react-router-dom'
import "./Restaurant.css"
import Addproduct from './Addproduct'
import Allproduct from './Allproduct'
import Rec_order from './Rec_order'

const Restaurant = () => {
  const location=useLocation()
  const [navData,setNavData]=useState("rec_order")
  const[logData,setLogData]=useState("")
  const[login,setLogin]=useState("")
  const[name,setName]=useState("")
  const[view,setView]=useState(false)
  

  useEffect(()=>{
    
    setLogin(location.state?.login)
    setLogData(location.state?.data)
    
    location.state?.data.map((e)=>{
      setName(e.name)
      setView(true)
    })
  },[])
  const Nav_Content=(e)=>{
    setNavData(e)
  }
 
  return (
    <div className='restaurant'>
      <NavRest Profile={logData} Login={login} Nav_Content={Nav_Content} ></NavRest>
{
      view &&<div >
      {
       
      navData === "rec_order" ? (
  
        <Rec_order name={name} logData={logData}></Rec_order>
        
        ) : 
        navData === "add" ? (
        <Addproduct Name={name}/>
        ) :
        (
          <Allproduct Name={name}/>
    )}
      </div>
}  
    </div>
     
    
  )
}

export default Restaurant
