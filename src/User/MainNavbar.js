import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HiX } from 'react-icons/hi';
import './MainNavbar.css';
import axios from "axios";
import Profile from '../Components/Profile';
import { BsFillCartPlusFill } from 'react-icons/bs';
import { setUser, setToken, setLoginStatus, deleteAll, setRest } from '../Redux/Actions/index';

const MainNavbar = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(state => state.user);
  const token = useSelector(state => state.token);
  const loginStatus = useSelector(state => state.isLoggedIn);
  const restId = useSelector(state => state.restId);
  const [profileEdit, setProfileEdit] = useState(false);

  const [view, setView] = useState(false);
  const [email, setEmail] = useState("");
  const [addr, setAddr] = useState("");
  const [image, setImage] = useState("");
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    if (Array.isArray(userData)) {
      userData.forEach((e) => {
        setImage(e.image);
        setEmail(e.email);
      });
    } else {
      setImage("");
    }
    if (loginStatus) {
      const userOrder = async () => {
        try {
          const res = await axios.post(`${process.env.REACT_APP_API_URL}/userOrder`, {}, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const dataslice = res.data.slice(0, 5);
          setOrderData(dataslice);
        } catch (error) {
          alert("Something went wrong: " + error.message);
        }
      }
      userOrder();
    }
  }, [userData, loginStatus, token]);

  const profile = () => {
    setView(true);
  };

  const profile_edit = () => {
    setProfileEdit(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  async function submit(e) {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/user_update`, {
        image, email, addr
      })
        .then(res => {
          if (res.data === "exist") {
            alert("update successful");
            setProfileEdit(false);
          } else if (res.data === "no changes") {
            alert("no changes");
            setProfileEdit(false);
          } else {
            alert("wrong details");
          }
        })
        .catch(e => {
          alert("wrong details");
        });
    } catch (e) {
      console.log(e);
    }
  }

  const Cart = () => {
    const state = {
      restId: restId,
    };
    if (loginStatus) {
      navigate('/cart', { state: state });
    } else {
      navigate('/login', { state: { from: "cart" } });
    }
  };

  const logout = () => {
    dispatch(setUser(null));
    dispatch(setToken(null));
    dispatch(setLoginStatus(false));
    dispatch(deleteAll());
    dispatch(setRest(null));
    setImage("");
    setOrderData([]);
    navigate("/");
  };

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
                image ?
                  <img src={image} onClick={profile} alt="" className='icon' />
                  :
                  <img src="./owner/profile.png" alt='icon' onClick={profile} className='icon' />
              }
            </div>
          </div>
        </div>
      </nav>
      {view && (
        <div className="profile-data">
          <HiX className="icon x" onClick={() => setView(false)} /> <br />
          {loginStatus && (
            <div>
              <h5 onClick={profile_edit} className='edit'>Update profile</h5>
            </div>
          )}
          <div>
            <Profile />
          </div>
          <div>
            {Array.isArray(orderData) && orderData.length > 0 && (
              <div className='profile-order'>
                <div className='or-title'>Recent Order</div>
                <div>
                  <div className='order-data'>
                    <div>Restaurant</div>
                    <div>Price</div>
                    <div>Status</div>
                  </div>
                  {orderData.map((e, index) => (
                    <div key={index} className='order-data'>
                      <div>{e.restname}</div>
                      <div>{e.price}</div>
                      <div>{e.status}</div>
                    </div>
                  ))}
                </div>
               
              </div>
            )}
            {
              loginStatus && (
                <div className='btn-box'>
                  <button className='button-order' onClick={logout}>Logout</button>
                </div>
              )
            }
             
          </div>
        </div>
      )}
      {profileEdit && (
        <div className="profile-data">
          <HiX className="icon x" onClick={() => setProfileEdit(false)} /> <br />
          <div className='editable'>
            <form>
              <div>
                <h4 className='first-span'>Profile Image</h4>
                <input type="file" onChange={handleImageChange} />
              </div>
              <div>
                <h4 className='first-span'>Address</h4>
                <input type="text" onChange={(e) => setAddr(e.target.value)} />
              </div>
              <button className='button' onClick={submit}>Update</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default MainNavbar;
