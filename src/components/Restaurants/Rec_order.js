
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { BiSolidPhoneCall } from 'react-icons/bi';
import { FaUserCircle } from "react-icons/fa";
import { FaLocationDot } from 'react-icons/fa6';
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useReactToPrint } from 'react-to-print';
import Print from './Print';
import { HiX } from 'react-icons/hi';


const Rec_order = (props) => {

  const history=useNavigate();
  // const printRef = useRef();
  const [data, setData] = useState('');
  const [Billdata, setBilldata] = useState('');
  const [view, setView] = useState(false);
  const [total, setTotal] = useState(false);
  const [viewdata, setViewdata] = useState(false);
  const [print, setPrint] = useState(false);
  const [rest,setRest]=useState()

  const fetchData = async () => {

    const name = props.name;
    try {
      const response = await axios.post('http://localhost:8000/rec_order', { name });
      if (response.data) {
        const newData = response.data;
        console.log(newData);
        setData(newData);
      } else {
        console.log('Data not found');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    setRest(props.logData)
    fetchData();
  }, [props.Name]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData();
    }, 60000);


    return () => clearInterval(intervalId);
  }, []);



  const update = (orderId) => {
    const updatedData = data.filter((order) => order._id !== orderId);
    setData(updatedData);
  }

  const cancel = async (orderId) => {

    try {
      const response = await axios.post('http://localhost:8000/cancel-order', { orderId });
      if (response.data === "true") {
        update(orderId)
        alert("cancel order");
      } else {
        console.log('Data not found');
      }
    }
    catch (e) {
      alert(e)
    }
  }
  const confirm = async (orderId) => {

    try {
      const response = await axios.post('http://localhost:8000/confirm-order', { orderId });
      if (response.data === "true") {
        update(data._id)
        alert("Confirm Order");
      } else {
        console.log('Data not found');
      }
    }
    catch (e) {
      alert(e)
    }

  }
  // const handlePrint = useReactToPrint({
  //   content: () => printRef.current,
   
  // });

  const handleMain = (e) => {

    setBilldata(e)
    setPrint(true)
    // handlePrint()
    history("/print",{state:{data:e,rest:rest}})
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


          <h3>All Orders</h3>

          {
            Array.isArray(data) && data.length > 0 ? (
              data.map((e, i) => (
                <>
                  <div className='order-main'>

                    <p><img src={`./images/${e.LogData[0].image}`} alt="" className='order-image' />{e.bill_address.name}</p>
                    <p className='center'><BiSolidPhoneCall />{e.bill_address.mobile}</p>
                    <p><FaLocationDot />{e.bill_address.address} {e.bill_address.city} {e.bill_address.state} {e.bill_address.pin}</p>
                    <p className='center'><FaIndianRupeeSign />{e.payment.total}</p>
                    <p className='btn-group'>
                      <button className='view' onClick={() => viewHandle(e)}>View</button>
                      <button className='Print' onClick={() => handleMain(e)}>Print</button>
                      <button className='confirm' onClick={() => confirm(e._id)}>Confirm</button>
                      <button className='cancel' onClick={() => cancel(e._id)}>Cancel</button>
                    </p>
                  </div>
                  {
                    view && (
                      <>
                        <div className='popup-overlay'></div>
                        <div className='popup'>

                          <div className='rec-table'>
                            <table>
                              <HiX className="popup-close" onClick={() => setView(false)} />
                              <p className='sub-title'>order details</p>
                              <tr>
                                <th>Item</th>
                                <th>Qty</th>
                                <th>Price</th>
                                <th>Total</th>
                              </tr>
                              {

                                viewdata.map((e, i) => (

                                  <tr>
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
                          <p className='btn-popup'>
                            <button className='view' onClick={() => handleMain(e)}>Print</button>
                            <button className='confirm' onClick={() => confirm(e._id)}>Confirm</button>
                            <button className='cancel' onClick={() => cancel(e._id)}>Cancel</button>
                          </p>

                        </div>
                      </>
                    )
                  }
                </>
              ))
            ) :
              (
                <h1>fetching Data...</h1>
              )
          }
        </div>

      </div>
      <div>
        {
      //  print && <Print Billdata={Billdata} ref={printRef} />
        }
      </div>


    </>
  )
}

export default Rec_order
