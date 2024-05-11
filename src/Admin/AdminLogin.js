import React, { useState } from 'react'
 import { useNavigate } from'react-router';
 import {  setLoginStatus } from '../Redux/Actions/index';
import { useDispatch } from 'react-redux';
const AdminLogin = () => {
    const history=useNavigate();
    const dispatch = useDispatch();

    const[email,setEmail]=useState(' ');
    const[password,setPassword]=useState(' ');

    async function submit(e){
        e.preventDefault(); 
       
        if (email === 'pawanpinjari21@gmail.com' && password === 'Pawan@1234') {
            dispatch(setLoginStatus(true));
            history('/admin');
        } else {
            alert("Invalid credentials");
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
           
            </div>
            
            <div className='col-md-2'></div>
        </div>
    </div>
  )
}

export default AdminLogin
