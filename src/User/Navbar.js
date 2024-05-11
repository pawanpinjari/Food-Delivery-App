import React from 'react'

const Navbar = ({filterItem,menuList}) => {
  return (
    <>
       <nav className="navbar" >
        <div className="navbar-content" >
        <div className='category'>Category</div>
          {menuList.map((curElem,index) => {
            return (
              <div  key={index}
                className=""
                onClick={() => filterItem(curElem)}>
             
                {curElem} 
               
              </div> 
              
            );
          })}
         
         
        </div>
      </nav>
    </> 
  )
}

export default Navbar
