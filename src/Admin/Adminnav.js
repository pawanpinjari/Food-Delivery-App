import React, { useState } from 'react';
import "./admin.css";
import { FiAlignJustify } from "react-icons/fi";
import { HiX } from 'react-icons/hi';

const Adminnav = (props) => {
  const [view, setView] = useState(false);

  const viewHandler = () => {
    setView(!view);
  }

  const handleLiClick = (content) => {
    props.navContent(content);
    setView(!view);
  }
  

  return (
    <>
      <div className='admin-nav'>
        <div onClick={viewHandler} ><FiAlignJustify className='menu-icon'/></div>
        <div >Sweetly</div>
      </div>


      {view && 
        <div className='sidebar1'>
          <HiX className="icon x" onClick={() => setView(false)} /> <br />
          <li onClick={() => handleLiClick("dashboard")}>Dashboard</li>
          <li onClick={() => handleLiClick("users")}>All Users</li>  
          <li onClick={() => handleLiClick("restaurants")}>All Restaurants</li>  
          <li onClick={() => handleLiClick("earnings")}>Total Earnings</li>  
          <li onClick={() => handleLiClick("received")}>Received Order</li>  
          <li onClick={() => handleLiClick("confirm")}>Confirm Order</li>  
          <li onClick={() => handleLiClick("cancelled")}>Cancelled Order</li>  
        </div>
      }
    </>
  )
}

export default Adminnav;
