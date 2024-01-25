import React from 'react'

const Navbar = ({filterItem,menuList}) => {
  return (
    <>
       <nav className="navbar" >
        <div className="navbar-content" >
        <li>category</li>
          {menuList.map((curElem,index) => {
            return (
              <li  key={index}
                className=""
                onClick={() => filterItem(curElem)}>
                {curElem}
              </li>
            );
          })}
        </div>
      </nav>
    </> 
  )
}

export default Navbar
