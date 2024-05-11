import React, { useState  } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from'react-router';
import axios from "axios"
import { setUser, setToken, setLoginStatus } from '../Redux/Actions/index';
const Signup = () => {
  const dispatch = useDispatch();
  const history=useNavigate();
    const[name,setName]=useState(" ")
    const[email,setEmail]=useState('')
    const[mobile,setMobile]=useState('')
    const[password,setPass]=useState('')

    async function submit(e){
      e.preventDefault();
      
      try{

          await axios.post("http://localhost:8000/signup",{
              name,email,mobile,password
          })
          .then(res=>{
            const data = res.data;
            const user = [data.user]
              if(res.data==="exist"){
                alert("User have not sign up")
              }
              else if(res.data){
                dispatch(setUser(user));
                        dispatch(setToken(data.token));
                        dispatch(setLoginStatus(true));
                        history("/", { state: { data: user, login: true } })
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
            <div className=' main'>
                <form action="POST">
                    <input type="text" className="box" id="name" placeholder="Name" onChange={(e)=>{setName(e.target.value)}}/>
                    
                    <input type="text" className='box' value={email} onChange= {(e) => { setEmail(e.target.value) }} placeholder="Email"  />
                  
                    <input type="text" className="box" id="phno" placeholder="Mobile"  onChange={(e)=>{setMobile(e.target.value)}}/>
                   
                    <input type="text" className="box" id="password" placeholder="Password"  onChange={(e)=>{setPass(e.target.value)}}/> 
                    
                   
                    <input type="submit" value="Register" id="submit" onClick={submit}/> <br />
                    <div className='sub-text'> You have already account please <a href="/login">Login Here</a></div>
            
                </form>

            </div>
      </div>
    </div>
  )
}

export default Signup
