import React, { useState  } from 'react'
import { useNavigate } from'react-router';
import axios from "axios"
const Signup = () => {
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
            const data=res.data;
              if(res.data==="exist"){
                alert("User have not sign up")
              }
              else if(res.data){
                console.log(res.data)
                history("/",{state:{data:data,login:true}})
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
                    <span className='sub-text'> You have already account please <a href="/login">Login Here</a></span>
            
                </form>

            </div>
      </div>
    </div>
  )
}

export default Signup
