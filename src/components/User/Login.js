import React, { useState } from 'react'
 import { useNavigate } from'react-router';
 import './User.css';
 import axios from "axios"
const Login = () => {
    const history=useNavigate();
    const[email,setEmail]=useState(' ');
    const[password,setPassword]=useState(' ');
    async function submit(e){
        e.preventDefault();
        try{

            await axios.post("http://localhost:8000/login",{
                email,password
            })
            .then(res=>{
                const data=res.data;
                console.log("data",data)
                if(res.data){
                    history("/",{state:{data:data,login:true}})
                }
                else if(res.data=="notexist"){
                    alert("User have not sign up")
                }
            })
            .catch(e=>{
                alert("wrong details")
                console.log(e);
            })

        }
        catch(e){
            console.log(e);

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
                
                <input type="text" className='box' onChange={(e) => { setEmail(e.target.value) }} placeholder="Email"/>
                <input type="password" className='box' onChange={(e) => { setPassword(e.target.value) }} placeholder="Password"/>
                <input type="submit" value='Login' onClick={submit} id="submit"/>

            </form>
            <span className='sub-text'> You have not account please <a href="/signup">Signup Here</a></span>
            </div>
            
            <div className='col-md-2'></div>
        </div>
    </div>
  )
}

export default Login
