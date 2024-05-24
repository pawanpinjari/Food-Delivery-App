import React, { useState } from 'react'
 import { useNavigate } from'react-router';
 import { useDispatch } from 'react-redux';
 import { setUser, setToken, setLoginStatus } from '../Redux/Actions/index';

 import axios from "axios"
const HotelLogin = () => {
    const dispatch = useDispatch();
    const history=useNavigate();
    const[email,setEmail]=useState(' ');
    const[password,setPassword]=useState(' ');
    async function submit(e){
        e.preventDefault();
        try{

            await axios.post(`${process.env.REACT_APP_API_URL}/rest_login`,{
                email,password
            })
            .then(res=>{
                const data=res.data;
                const user = [data.user]
               
                if(res.data==="notexist"){
                    alert("User have not sign up")
                }
                else {
                    dispatch(setUser(user));
                    dispatch(setToken(data.token));
                    dispatch(setLoginStatus(true));
                    history("/restaurant")
                   
                }
            })
            .catch(e=>{
                alert("wrong details")
                
            })

        }
        catch(e){
            alert("wrong details")

        }

    }
  return (
    <div className='cont'>
        <br /><br />
        <div className='title-cont'>
        <p><span className='title title-log'>SWEETLY </span><span className='sub-title'>Order Your Food..!</span></p>
       
        </div>
        
         
        <div className='row'>
            <div className='col-md-2'></div>
            <div className='col-md-8 main'>
           
            <form action="POST">
                
                <input type="text" className='box' onChange={(e) => { setEmail(e.target.value) }} placeholder="Owner Email"/>
                <input type="password" className='box' onChange={(e) => { setPassword(e.target.value) }} placeholder="Password"/>
                <input type="submit" value='Login' onClick={submit} id="submit"/>

            </form>
            <div className='sub-text'> Register your restaurant<a href="/rest_signup">Register Here</a></div>
            </div>
            
            <div className='col-md-2'></div>
        </div>
    </div>
  )
}

export default HotelLogin
