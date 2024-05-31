import React, { useState  } from 'react'
import { useNavigate } from'react-router';
import axios from "axios"
import { AiFillFileImage } from 'react-icons/ai';

const HotelSignup = () => {
  const history=useNavigate();
  const[name,setName]=useState('')
  const[email,setEmail]=useState('')
  const[addr,setAddr]=useState("")
    const[mobile,setMobile]=useState('')
    const[password,setPass]=useState('')
    const[image,setImage]=useState('')
    const[city,setCity]=useState('')
    const[desc,setDesc]=useState('')


    async function submit(e){
      e.preventDefault();
 
      try{

          await axios.post(`${process.env.REACT_APP_API_URL}/rest_signup`,{name,email,addr,mobile,password,image,city,desc})
          .then(res=>{
            const data=res.data;
              if(res.data==="exist"){
                alert("Restaurant can not register, Enter Different Restaurant Name")
              }
              else if(res.data==="notexist"){
                history("/restaurant",{state:{data:data,login:true}})
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
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className='cont' >
      
      <div className='title-cont' style={{marginTop:"20px"}}>
        <p><span className='title title-log'>SWEETLY </span><span className='sub-title'>Order Your Food..!</span></p>
       
        </div>
      <div className='row'>
            <div className='rest-main'>
                <form action="POST">
                  <div>
                  <input type="text" className="box" id="name" placeholder="Restaurant Name" onChange={(e)=>{setName(e.target.value)}}  required/>
                  <input type="text" className='box' value={email} onChange= {(e) => { setEmail(e.target.value) }} placeholder="Owner Email" required />
                  <input type="text" className="box" id="phno" placeholder="Onwer Mobile"  onChange={(e)=>{setMobile(e.target.value)}} required/>
                 
                  <input type="text" className="box" id="addr" placeholder="Restaurant Address"  onChange={(e)=>{setAddr(e.target.value)}} required/>
                  <input type="text" className="box" id="city" placeholder="City"  onChange={(e)=>{setCity(e.target.value)}} required/>
                    <input type="text" className="box" id="password" placeholder=" Set Password"  onChange={(e)=>{setPass(e.target.value)}} required/> 
                    <input type="text" className="box" id="desc" placeholder=" Add few word for our resto"  onChange={(e)=>{setDesc(e.target.value)}} required/>
                    <div>
                    <input type="file" name="" id="file" title='choose food image' onChange={handleImageChange} required/> 
                    <label htmlFor="file"><AiFillFileImage />Add Resto Poster</label>
                    </div>
                   
                   
                    <input type="submit" value="Register" id="submit1" onClick={submit}/>
                  </div>
                  <br />
                    <span className='sub-text reg-text'> You have already register restaurant<a href="/rest_login">Login Here</a></span>
                </form>

            </div>
        
      </div>
    </div>
  )
}

export default HotelSignup
