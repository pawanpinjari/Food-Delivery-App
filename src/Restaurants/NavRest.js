import React, { useEffect, useState } from 'react'
import { HiX } from 'react-icons/hi';
import { HiOutlineMenu } from "react-icons/hi";
import { useSelector, useDispatch } from 'react-redux';
import Profile from '../Components/Profile';

const NavRest = (props) => {

  const logData = useSelector(state => state.user);
  const login = useSelector(state => state.isLoggedIn);

  const [image, setImage] = useState("")
  const [view, setView] = useState(false)
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    logData && logData.map((e) => (
      setImage(e.image)
    ))
  })


  const profile = () => {
    setView(true)

  }

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <>
      <nav className='nav-main'>
        <HiOutlineMenu className='menu-icon ' onClick={toggleMenu} />
        <li onClick={() => props.Nav_Content("rec_order")}>Recived Order</li>
        <li onClick={() => props.Nav_Content("confirm-order")}>Confirm Order</li>
        <li onClick={() => props.Nav_Content("cancel-order")}>Cancel Order</li>
        <li onClick={() => props.Nav_Content("add")}>Add Menu</li>
        <li onClick={() => props.Nav_Content("all_prod")}>Menu List</li>
        <div className="user">
          {
            image ? (
              <img src={`./images/${image}`} onClick={profile} alt="profile" className='icon' />

            ) : (
              <img src="./owner/profile.png" alt='icon' onClick={profile} className='icon' />

            )

          }
        </div>
      </nav>
      {showMenu && (
        <div className="profile-data">
          <HiX className="icon x" onClick={toggleMenu} /> <br />
          <div className='menu-item'>
          <li onClick={() => { props.Nav_Content("rec_order"); toggleMenu(); }}>Recived Order</li>


        <li onClick={() => { props.Nav_Content("confirm-order"); toggleMenu(); }}>Confirm Order</li>
        <li onClick={() => { props.Nav_Content("cancel-order"); toggleMenu(); }}>Cancel Order</li>
        <li onClick={() => { props.Nav_Content("add"); toggleMenu(); }}>Add Menu</li>
        <li onClick={() => { props.Nav_Content("all_prod"); toggleMenu(); }}>Menu List</li>
          </div>

        </div>
      )}
      {view && (
        <div className="profile-data">
          <HiX className="icon x" onClick={() => setView(false)} /> <br />
          <Profile></Profile>
{/* 
          {login ? (

            Array.isArray(logData) && logData.length > 0 ? (
              logData && logData.map((e) => (
                <div>
                  <div key={e._id} className='user-data'>
                    {
                      image ? (
                        <text>
                          <img src={`./images/${image}`} className='profile-image' alt="data" /> <br />
                          <a5 className='edit'></a5>
                        </text>

                      ) : (
                        <text>
                          <img src="./images/profile.png" alt='data' className='profile-image' /> <br />
                        
                        </text>
                      )

                    }
                    <text >
                    </text> <br />
                    <text>
                      <span className='first-span'>Resto Name: </span>
                      <span>{e.name}</span>
                    </text><br />
                    {
                      e.addr && <text>
                        <span className='first-span'>Resto Address:</span>
                        <span>{e.addr}</span> <br />
                      </text>
                    }
                    <text>
                      <span className='first-span'>Owner Email: </span>
                      <span>{e.email}</span>
                    </text><br />
                    <text>
                      <span className='first-span'>Owner Mobile: </span>
                      <span>{e.mobile}</span>
                    </text> <br />

                    <button className='button-logout' onClick={logout}>Logout</button>
                  </div>
                </div>

              ))
            ) : (
              <div >
                <div>
                  <div>
                    <div>
                      <p>something went wrong please try again</p>
                      <button className='button' style={{ height: "auto" }} onClick={() => navigate("/rest_login")}>Restaurant Login</button>
                      <button className='button' onClick={() => navigate("/signup")}>Admin</button>
                    </div>
                  </div>
                </div>
              </div>
            )
          ) : (
            <div >
              <div >
                <div>
                  <div>
                    <p>Login First</p>
                    <button className='button' style={{ height: "auto" }} onClick={() => navigate("/rest_login")}>Restaurant Login</button>
                  </div>
                </div>
              </div>
            </div>
          )} */}
        </div>
      )}
    </>
  )
}

export default NavRest



