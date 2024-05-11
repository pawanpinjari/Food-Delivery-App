import React, { useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setToken, setLoginStatus } from '../Redux/Actions/index';
import { HiX } from 'react-icons/hi';
import './MainNavbar.css';
import axios from "axios"
import Profile from '../Components/Profile';
import { BsFillCartPlusFill } from 'react-icons/bs';

const MainNavbar = (props ) => {
  const dispatch=useDispatch()
  const history = useNavigate();
  const navigate = useNavigate();
  const userData = useSelector(state => state.user);
  const loginStatus = useSelector(state => state.isLoggedIn);
  const restId = useSelector(state => state.restId);

  const [view, setView] = useState(false);
  const [email, setEmail] = useState("");
  const [addr, setAddr] = useState("");
  const [image, setImage] = useState("");


  useEffect(() => {

    if (Array.isArray(userData)) {
      userData.map((e) => setImage(e.image));
    }
  }, [userData]);

  const profile = () => {
    setView(true);


  };

 const Cart =()=>{

  const state = {
    restId: restId,
};
  if(loginStatus==true){
    navigate("/cart", { state: state })

  }
  else{
    alert("Login First")
  }
 }
  return (
    <>
      <nav className="nav-main">
        <div className="main-container">
          <div>
            <div>
              <p className="title">SWEETLY</p>
            </div>

          </div>
          <div></div>
          <div className='nav-cart'>
            {
              props.cart &&
            <li onClick={Cart} className='cart-li'><BsFillCartPlusFill /></li>
            }
          </div>
          <div>
            <div className="user">
           
              
              {
                image ? (
                  <img src={`./images/${image}`} onClick={profile} alt="profile" className='icon' />

                ) : (
                  <img src="./owner/profile.png" alt='icon' onClick={profile} className='icon' />

                )

              }
            </div>
          </div>
        </div>
      </nav>
      {view && (
        

        <div className="profile-data">
          <HiX className="icon x" onClick={() => setView(false)} /> <br />
          <Profile></Profile>

          {/* {loginStatus ? (
            Array.isArray(userData) && userData.length > 0 ? (
              userData.map((e) => (
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
                          <img src="./owner/profile.png" alt='data' className='profile-image' /> <br />
                          <h5 onClick={() => { profile_edit(e.email); }} className='edit'>edit profile</h5>
                        </text>
                      )

                    }
                    <text >
                    </text> <br />
                    <text>
                      <span className='first-span'>Name: </span>
                      <span>{e.name}</span>
                    </text><br />
                    <text>
                      <span className='first-span'>Email: </span>
                      <span>{e.email}</span>
                    </text><br />
                    <text>
                      <span className='first-span'>Mobile: </span>
                      <span>{e.mobile}</span>
                    </text> <br />
                    {
                      e.address && <text>
                        <span className='first-span'>Address:</span>
                        <span>{e.address}</span> <br />
                      </text>
                    }
                    <button className='button-logout' onClick={logout}>Logout</button>
                  </div>
                </div>

              ))
            ) : (
              <div >
                <div>
                  <div>
                    <p>something went wrong please try again</p>
                    <button className='button' onClick={() => navigate("/login")}>User Login</button>
                    <button className='button' style={{ height: "auto" }} onClick={() => navigate("/rest_login")}>Restaurant Login</button>
                    <button className='button' onClick={() => navigate("/signup")}>Admin</button>
                  </div>
                </div>
              </div>
            )
          ) : (
            <div >
              <div >
                <div>
                  <button className='button' onClick={() => navigate("/login")}>User Login</button>
                  <button className='button' style={{ height: "auto" }} onClick={() => navigate("/rest_login")}>Restaurant Login</button>
                  <button className='button' onClick={() => navigate("/admin-login")}>Admin</button>
                </div>
              </div>
            </div>
          )} */}
        </div>
      )}
      {/* {
        profileEdit && <div className="profile-data">
          <HiX className="icon x" onClick={() => setProfileEdit(false)} /> <br />
          {

            <div className='editable'>
              <form >
                <text><h4 className='first-span'>profile image</h4>
                  <input type="file" name="" id="" onChange={(e) => { setImage(e.target.files[0]) }} />
                </text>
                <text><h4 className='first-span'>Address</h4>
                  <input type="text" onChange={(e) => { setAddr(e.target.value) }} name="" id="" />
                </text>
                <button className='button' onClick={submit}>Submit</button>
              </form>
            </div>

          }

        </div>
      } */}
    </>
  );
};

export default MainNavbar;
