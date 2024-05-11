import React from 'react'

const Sidenavbar = ({filterItem,menuList}) => {
  return (
    <>
       <nav className="navbar" >
        <div className="navbar-content" >
        <li className='category'>category</li>
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

export default Sidenavbar