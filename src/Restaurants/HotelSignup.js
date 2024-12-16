import React, { useState } from 'react'
import { useNavigate } from'react-router';
import { useDispatch } from 'react-redux';
import { setUser, setToken, setLoginStatus } from '../Redux/Actions/index';
import axios from "axios"
import { AiFillFileImage } from 'react-icons/ai';

const HotelSignup = () => {
  const dispatch = useDispatch();
  const history=useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    addr: '',
    mobile: '',
    password: '',
    image: '',
    city: '',
    desc: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const { name, email, addr, mobile, password, image, city, desc } = formData;

  // Handle input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrorMessage(''); 
  };
  const validateFields = () => {
    for (const key in formData) {
      if (!formData[key]) {
        return `Please fill in the ${key === 'addr' ? 'address' : key}.`;
      }
    }
    return null;
  };
  async function submit(e) {
    e.preventDefault();
    const error = validateFields();
    if (error) {
      setErrorMessage(error);
      return;
    }
    else{
      setErrorMessage(''); 
    }
    try {

      await axios.post(`${process.env.REACT_APP_API_URL}/rest_signup`, { name, email, addr, mobile, password, image, city, desc })
        .then(res => {
          const data = res.data;
          const user = [data.user];
          if (res.data === "exist") {
            alert("Restaurant can not register")
          }
          else if (user) {

            dispatch(setUser(user));
            dispatch(setToken(data.token));
            dispatch(setLoginStatus(true));
            history("/restaurant")
          }
        })
        .catch(e => {
          alert("wrong details")

        })

    }
    catch (e) {
      alert("wrong details")

    }

  }
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result });

    };
    reader.readAsDataURL(file);
  };

  return (
    <div className='cont' >

      <div className='title-cont' style={{ marginTop: "20px" }}>
        <p><span className='title title-log'>SWEETLY </span><span className='sub-title'>Order Your Food..!</span></p>

      </div>
      <div className='row'>
        <div className='rest-main'>
          <form action="POST">
            <div>
              <input
                type="text"
                className="box"
                id="name"
                placeholder="Restaurant Name"
                value={name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                className='box'
                id='email'
                placeholder='Owner email'
                value={email}
                onChange={handleChange}
                required 
              />
              <input
                type="text"
                className="box"
                id="mobile"
                placeholder="Onwer Mobile"
                value={mobile}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                className="box"
                id="addr"
                placeholder="Restaurant Address"
                value={addr}
                onChange={handleChange}  
                required
              />
              <input
                type="text"
                className="box"
                id="city"
                placeholder="City"
                value={city}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                className="box"
                id="password"
                placeholder=" Set Password"
                value={password}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                className="box" id="desc"
                placeholder=" Add few word for our resto"
                value={desc}
                onChange={handleChange}
                required
              />
              <div>
                <input
                  type="file"
                  name=""
                  id="file"
                  title='choose food image'
                  onChange={handleImageChange}
                  required
                />
                <label htmlFor="file"><AiFillFileImage />Add Resto Poster</label>
              </div>


              <input
                type="submit"
                value="Register"
                id="submit1"
                onClick={submit}
              />
            </div>
            <br />
            {errorMessage && <p className="error-message" style={{ color: 'red' }}>{errorMessage}</p>}
            <span className='sub-text reg-text'> You have already register restaurant<a href="/rest_login">Login Here</a></span>
          </form>

        </div>

      </div>
    </div>
  )
}

export default HotelSignup
