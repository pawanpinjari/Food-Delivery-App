import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { BiSolidPhoneCall } from 'react-icons/bi';
import { FaUserCircle } from "react-icons/fa";
import { FaLocationDot } from 'react-icons/fa6';
import { FaIndianRupeeSign } from "react-icons/fa6";
import { HiX } from 'react-icons/hi';
import { useSelector } from 'react-redux';

const Confirm_order = (props) => {

  const history=useNavigate();
  const token = useSelector(state => state.token);
  const [data, setData] = useState('');
  const [Billdata, setBilldata] = useState('');
  const [view, setView] = useState(false);
  const [total, setTotal] = useState(false);
  const [viewdata, setViewdata] = useState(false);
  const [print, setPrint] = useState(false);
  const [rest,setRest]=useState()


  const fetchData = async () => {

    try {
      const response = await axios.post('http://localhost:8000/confirmed-order',{},{
      headers: {
        Authorization: `Bearer ${token}` 
      }
    });
      if (response.data) {
        const newData = response.data;

        setData(newData);
      } else {
        alert('Data not found');
      }
    } catch (error) {
      alert('Error fetching data');
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);


  const cancel = async (orderId) => {

    try {
      const response = await axios.post('http://localhost:8000/cancel-order', { orderId });
      if (response.data === "true") {
        // update(orderId)
        alert("cancel order");
      } else {
        console.log('Data not found');
      }
    }
    catch (e) {
      alert(e)
    }
  }

  const handleMain = (e) => {

    setBilldata(e)
    setPrint(true)
    history("/print",{state:{data:e}})
  }

  const viewHandle = (e) => {
    setViewdata(e.cart_data)
    setTotal(e.payment.total)
    setView(true);
    
  };

  return (
    <>
     
      <div className='order-container' >
        <div className='empty'></div>
        <div className='cont-rec'>

          <h3 className='main-title'>Confirmed Order</h3>

          {
            Array.isArray(data) && data.length > 0 ? (
              data.map((e, i) => (
                <div key={i}>
                  <div className='order-main' >
                    <div className='order1'>
                    {/* <img src={e.image} alt="" className='order-image' /> */}
                    <p>{e.bill_address.name}</p>
                    <p className='center'><BiSolidPhoneCall />{e.bill_address.mobile}</p>
                   <p className='center'><FaIndianRupeeSign />{e.payment.total}</p>
                    
                    </div>
                   <div>
                   <p className='order-addr'><FaLocationDot />{e.bill_address.address} {e.bill_address.city} {e.bill_address.state} {e.bill_address.pin}</p>
                   </div>
                   <div className='btn-group' >
                      <button className='view' onClick={() => viewHandle(e)}>View</button>
                      <button className='Print' onClick={() => handleMain(e)}>Print</button>
                      <button className='cancel' onClick={() => cancel(e._id)}>Cancel</button>
                    </div>
                   
                  </div>
                  {
                    view && (
                      <>
                        <div className='popup-overlay'></div>
                        <div className='popup'>

                          <div className='rec-table'>
                            <table>
                              <HiX className="popup-close" onClick={() => setView(false)} />
                              <p className='popup-title'>Order Details</p>
                              <tr>
                                <th>Item</th>
                                <th>Qty</th>
                                <th>Price</th>
                                <th>Total</th>
                              </tr>
                              {

                                viewdata.map((e, i) => (

                                  <tr key={i}>
                                    <td>{e.name}</td>
                                    <td>{e.quantity}</td>
                                    <td>{e.price}</td>
                                    <td>{e.quantity * e.price}</td>
                                  </tr>
                                ))
                              }
                              <tr>
                                <th></th>
                                <th></th>
                                <th>total</th>
                                <th>{total}</th>
                              </tr>
                            </table>

                          </div>
                          

                        </div>
                      </>
                    )
                  }
                </div>
              ))
            ) :
              (
                <h1>fetching Data...</h1>
              )
          }
        </div>

      </div>
     


    </>
  )
}

export default Confirm_order
