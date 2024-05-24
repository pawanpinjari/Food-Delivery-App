import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import MainNavbar from './MainNavbar';
import Footer from '../Footer';
import axios from 'axios';
import { setCart } from '../Redux/Actions/index';

const Payment = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const userData = useSelector(state => state.user);
  const token = useSelector(state => state.token);
  const [name, setName] = useState(userData[0]?.name);
  const [mobile, setMobile] = useState(userData[0]?.mobile);
  const [email, setEmail] = useState(userData[0]?.email);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pin, setPin] = useState('');
  const [paymentID, setPaymentID] = useState('');
  const [orderID, setOrderID] = useState('');
  const [signature, setsignature] = useState('');

  const total = location.state.total;
  const cart_data = location.state.cart_data;
  const restId = location.state.restId;

  useEffect(() => {
    const loadRazorpay = () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        console.log('Razorpay SDK loaded successfully');
      };
      script.onerror = () => {
        console.error('Razorpay SDK failed to load');
      };
      document.body.appendChild(script);
    };

    loadRazorpay();
  }, []);

  const displayRazorpay = async () => {
    const result = await axios.post(`${process.env.REACT_APP_API_URL}/orderpayment`, {
      amount: total * 100,
      currency: 'INR',
      receipt: 'receipt#1'
    });

    if (!result) {
      alert('Server error. Are you online?');
      return;
    }

    const { amount, id: order_id, currency } = result.data;

    if (!window.Razorpay) {
      alert('Razorpay SDK not loaded. Please try again.');
      return;
    }

    const options = {
      key: process.env.REACT_APP_REZORPAY_KEY, 
      amount: amount,
      currency: currency,
      name: 'Sweetly',
      description: 'Test Transaction',
      order_id: order_id,
      handler: function (response) {

        setPaymentID(response.razorpay_payment_id)
        setOrderID(response.razorpay_order_id)
        setsignature(response.razorpay_signature)
        order();
      },
      prefill: {
        name: userData[0]?.name || '',
        email: userData[0]?.email || '',
        contact: userData[0]?.mobile || ''
      },
      notes: {
        address: 'Sweetly Office'
      },
      theme: {
        color: '#FFA500'
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name || !mobile || !email || !address || !city || !state || !pin ) {
      alert('Please fill out all the required fields.');
      return;
    } 
    await displayRazorpay();
  };
  const order=async(e)=>{
    const Bill_address = {
      name: name,
      mobile: mobile,
      address: address,
      city: city,
      state: state,
      pin: pin
    };
    
    const Payment = {
      total: total,
      paymentID:paymentID,
      orderID:orderID,
      signature:signature
    };
    
    const data = {
      restId: restId,
      cart_data: cart_data,
      bill_address: Bill_address,
      payment: Payment,
      status: "pending"
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/order`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data) {
        alert("Order placed successfully");
        navigate("/");
        dispatch(setCart(null));
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      alert("Something went wrong");
    }
  }

  return (
    <>
      <MainNavbar />
      <div className='pay-container'>
        <div className="contact ">
         <div  className="text"> Billing Address</div>
          <div className="column right">
            <form onSubmit={onSubmit} >
          
                  <div className="field name">
                    <input type="text" id="name" placeholder="Name" value={name} onChange={(e) => { setName(e.target.value) }} required />
                  </div>
                  <div className="field email">
                    <input type="email" id="email" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} required />
                  </div>
          
                  <div className="field mobile">
                    <input type="text" id="mobile" placeholder="Mobile No."  value={mobile} onChange={(e) => { setMobile(e.target.value) }} required />
                  </div>
                  <div className="field address">
                    <input type="text" name="address" id="address" placeholder="Address" value={address} onChange={(e) => { setAddress(e.target.value) }} required/>
                  </div>          
                  <div className="field city">
                    <input type="text" id="city" placeholder="City"  value={city} onChange={(e) => { setCity(e.target.value) }} required />
                  </div>
                  <div className="field state">
                    <input type="email" id="state" placeholder="State" value={state} onChange={(e) => { setState(e.target.value) }} required />
                  </div>
                  <div className="field pin">
                    <input type="number" id="pin"  placeholder="Pin Code" value={pin} onChange={(e) => { setPin(e.target.value) }} required />
                  </div>
                <div className="button-area">
                  <button type="submit"  value="Proceed to Checkout" onClick={onSubmit}>Proceed to Checkout</button>
                </div>
              </form>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Payment;
