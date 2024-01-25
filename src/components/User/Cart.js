import React, { useEffect, useState } from 'react'
import MenuCard from './MenuCard'
import { useLocation, useNavigate } from "react-router-dom"
import MainNavbar from './MainNavbar'
import "./style.css"
import { AiFillDelete } from 'react-icons/ai';

const Cart = (props) => {

  const location = useLocation()
  const navigate = useNavigate()
  const Data = location.state.cart;
  const [Filter, setFilter] = useState(Data)
  const [subTotal, setSubTotal] = useState(0)
  const [total, setTotal] = useState(0)
  const [GST,setGST] = useState(0)

  const LogData = location.state.LogData;
  const Login = location.state.Login;
  const restName = location.state.restName;

  useEffect(() => {
    Billtotal()
  })
  const Billtotal = () => {
    const arr2 = [];
    Filter.map((ele) => {
      const arr = ele.price * ele.quantity;
      const arr1 = Number(arr);
      arr2.push(arr1)
    })
    var total1 = 0;
    for (let i = 0; i < arr2.length; i++) {
      total1 += arr2[i];
    }
    setSubTotal(total1)
    const gst = (total1 * 18) / 100;
    const totalAmount = subTotal + gst;
    setGST(gst)
    setTotal(totalAmount);
  }

  const onPayment = () => {

    const state = {
      restName: restName,
      cart_data: Filter,
      subTotal: subTotal,
      GST:GST,
      total: total,
      Login: Login,
      LogData: LogData
    };
    navigate("/payment", { state: state })
  }
  const onCancal = (i) => {
    const filter = Filter.filter((index) => {
      return i !== index.name;
    })
    setFilter(filter)
  }
  console.log(Filter)
  const increase = (id) => {

    const updatedFilter = Filter.map((index) => {
      if (id === index.id) {
        return {
          ...index,
          quantity: index.quantity + 1,
        };
      }
      return index;

    });

    setFilter(updatedFilter);
  };
  const decrease = (id) => {

    const updatedFilter = Filter.map((index) => {
      if (id === index.id) {
        return {
          ...index,
          quantity: index.quantity - 1,
        };
      }
      return index;

    });

    setFilter(updatedFilter);
  };
  return (

    <>
      <MainNavbar LogData={LogData} Login={Login}></MainNavbar>
      <section className='cart-container'>
        <table>
          <tr>
            <th >Remove</th>
            <th>Food</th>
            <th className='cart-name'>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr >
          {
            Filter.map((ele, i) => {
              return (
                < >
                  <tr >
                    <td><AiFillDelete className="cart-delete" onClick={() => onCancal(ele.name)} /></td>
                    <td><img src={`./images/${ele.image}`} className='cart-image' alt="" /></td>
                    <td key={i} className='cart-name'>{ele.name}</td>
                    <td className='inc'><span onClick={() => { decrease(ele.id) }}>-</span><span>{ele.quantity}</span><span onClick={() => { increase(ele.id) }}>+</span></td>
                    <td>{ele.price}</td>
                    <td>{ele.price * ele.quantity}</td>


                  </tr>

                </>
              )
            })
          }

        </table>
        <table>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th>Sub Total</th>
            <th>{subTotal}</th>

          </tr>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th>GST 18%<br />Total Pay Amount</th>
            <th>{GST}<br />{total}</th>
          </tr>

          <button className='cart-btn' onClick={onPayment}>Place Order</button>

        </table>
      </section>

    </>

  )
}

export default Cart
