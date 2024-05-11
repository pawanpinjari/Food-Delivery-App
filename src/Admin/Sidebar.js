import React from 'react'

const Sidebar = (props) => {
    
  const handleLiClick = (content) => {
    props.navContent(content);
  }
  return (
    <div className='sidebar'>
    <li onClick={() => handleLiClick("dashboard")}>Dashboard</li>
      <li onClick={() => handleLiClick("users")}>All Users</li>  
      <li onClick={() => handleLiClick("restaurants")}>All Restaurants</li>  
      <li onClick={() => handleLiClick("earnings")}>Total Earnings</li>  
      <li onClick={() => handleLiClick("received")}>Received Order</li>  
      <li onClick={() => handleLiClick("confirm")}>Confirm Order</li>  
      <li onClick={() => handleLiClick("cancelled")}>Cancelled Order</li>  
    </div>
  )
}

export default Sidebar
