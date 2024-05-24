import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import MainNavbar from './MainNavbar'
import "./style.css"
import { AiFillDelete } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { dec_Qty, deleteItem , inc_Qty } from '../Redux/Actions'
import Footer from '../Footer'

const Cart = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [subTotal, setSubTotal] = useState(0)
  const [total, setTotal] = useState(0)
  const [GST, setGST] = useState(0)

  const cartData = useSelector(state => state.cart);
  const restId = useSelector(state => state.restId);;

 useEffect(()=>{
  Billtotal()
 })
  const Billtotal = () => {
    const arr2 = [];
    cartData.forEach((ele) => {
      const arr = ele.price * ele.quantity;
      const arr1 = Number(arr);
      arr2.push(arr1);
    });
    console.log(arr2)
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
      restId: restId,
      cart_data: cartData,
      subTotal: subTotal,
      GST: GST,
      total: total
    };
    navigate("/payment", { state: state })
  }
  const onCancel = (i) => {

    dispatch(deleteItem(i));
  }
  const increase = (id) => {
    dispatch(inc_Qty(id));

  };
  const decrease = (id) => {

    dispatch(dec_Qty(id));
  };
  return (

    <>
      <MainNavbar ></MainNavbar>
      <section className='cart-container'>
        <h2 className='menu-title h1-container'>Review Order</h2> <br />
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
           
            cartData.map((ele, i) => {
              return (
                < >
                  <tr >
                    <td><AiFillDelete className="cart-delete" onClick={() => onCancel(ele.id)} /></td>
                    <td><img src={`${ele.image}`} className='cart-image' alt="" /></td>
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
            <th className='extra-td'></th>
            <th className='extra-td'></th>
            <th className='extra-td'></th>
            <th className='extra-td'></th>
            <th>Sub Total</th>
            <th>{subTotal}</th>

          </tr>
          <tr>
            <th className='extra-td'></th>
            <th className='extra-td'></th>
            <th className='extra-td'></th>
            <th className='extra-td'></th>
            <th >GST 18%<br />Total Pay Amount</th>
            <th>{GST}<br />{total}</th>
          </tr>

          <button className='cart-btn' onClick={onPayment}>Place Order</button>
        </table>
      </section>
<Footer/>
    </>

  )
}

export default Cart
