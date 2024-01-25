import React, { useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import MainNavbar from './MainNavbar'
import "./payment.css"
import axios from 'axios'

const Payment = (props) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [name,setName]=useState(location.state.LogData[0]?.name)
  const [mobile,setMobile]=useState(location.state.LogData[0]?.mobile)
  const [email,setEmail]=useState(location.state.LogData[0]?.email)
  const [address,setAddress]=useState()
  const [city,setCity]=useState()
  const [state,setState]=useState()
  const [pin,setPin]=useState()
  const [cHolder,setCHolder]=useState()
  const [cNumber,setCNumber]=useState()
  const [cMonth,setCMonth]=useState()
  const [cYear,setCYear]=useState()
  const [cCVV,setCCVV]=useState()

  const total = location.state.total;
  const LogData = location.state.LogData;
  const name1 = LogData[0].email;
  const Login = location.state.Login;
  const cart_data = location.state.cart_data;
  const restName = location.state.restName;
async function onSubmit(e){
  e.preventDefault();
  if (!name || !mobile || !email || !address || !city || !state || !pin || !cHolder || !cNumber || !cMonth || !cYear || !cCVV) {
    alert('Please fill out all the required fields.');
    return;
  }
  const Bill_address={
    name:name,
    mobile:mobile,
    address:address,
    city:city,
    state:state,
    pin:pin
  }
  const Payment={
    total:total,
    card_holder:cHolder,
    card_number:cNumber,
    card_expMonth:cMonth,
    card_expYear:cYear,
    card_cvv:cCVV
  }
  const data = {
    status:"pending",
    restName:restName,
    LogData: LogData,
    cart_data:cart_data,
    bill_address:Bill_address,
    payment:Payment
  };
  
  try{
      await axios.post("http://localhost:8000/order",data)
      .then(res=>{
        if(res.data){
          alert("order place successful")
          navigate("/")
          
        }
       else{
        alert("something want wrong")
       }
      })
  }
  catch(e){

  }
}
  return (
    <>
    <MainNavbar LogData={LogData} Login={Login}></MainNavbar>
    <header>

    
      <div class="container-pay">
        <div class="left">
          <h3>BILLING ADDRESS</h3>
          <form>
            <input type="text" name="name" placeholder="Name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
            <input type="text" name="" placeholder="Mobile Number" value={mobile} onChange={(e)=>{setMobile(e.target.value)}}/>
            <input type="text" name="address" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            <input type="text" name="address" placeholder="Address" value={address} onChange={(e)=>{setAddress(e.target.value)}}/>
            
            <input type="text" name="city" placeholder="City" value={city} onChange={(e)=>{setCity(e.target.value)}}/>
            <input type="text" name="state" placeholder="State" value={state} onChange={(e)=>{setState(e.target.value)}}/>
            <input type="text" name="pin_code" maxLength="6" placeholder="Pin Code" value={pin} onChange={(e)=>{setPin(e.target.value)}}/>
              
          </form>
        </div>
        <div class="right">
          <h3>PAYMENT</h3>
          <form>
            <div className='pay-images'>
              <p>
              <img src="./image/card1.png" width="100"/>
				   <img src="./image/card2.png" width="50"/>
           <img src="./image/card3.png" width="50" alt="" />
              </p>
            
            </div>
            <div>
              <h2>Total Amount :{total}</h2>
            </div>
            <input type="text" name="" placeholder="Card Holder Name" value={cHolder} onChange={(e)=>{setCHolder(e.target.value)}}/>
            <input type="text" name="" placeholder="Card number" value={cNumber} onChange={(e)=>{setCNumber(e.target.value)}}/>
            <input type="text" name="" placeholder="Exp Month" value={cMonth} onChange={(e)=>{setCMonth(e.target.value)}} />

            <input type="text" name="" placeholder="Exp Year" value={cYear} onChange={(e)=>{setCYear(e.target.value)}}/>

            <input type="text" name="" placeholder="CVV" value={cCVV} onChange={(e)=>{setCCVV(e.target.value)}}/>

          <input type="submit" className='pay-submit' name="" value="Proceed to Checkout" onClick={onSubmit}/>
          </form>
        </div>
      </div>
      </header>
    </>
  )
}

export default Payment
