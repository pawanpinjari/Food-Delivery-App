import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { BiSolidPhoneCall } from 'react-icons/bi';
import { FaLocationDot, FaIndianRupeeSign } from 'react-icons/fa6';
import { HiX } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import Loading from '../Components/Loading';

const RecOrder = (props) => {

  const history = useNavigate();
  const token = useSelector(state => state.token);
  const [data, setData] = useState([]);
  const [view, setView] = useState(false);
  const [total, setTotal] = useState(0);
  const [viewData, setViewData] = useState([]);
  // const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/rec_order`, {}, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      if (response.data) {
        setData(response.data);
              
      } else {
        alert('Data not found');
      }
    } catch (error) {
      alert('Error fetching data:', error);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData();
    }, 10000);

    return () => clearInterval(intervalId);
  }, [fetchData]);

  const cancel = async (orderId) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/cancel-order`, { orderId });
      if (response.data === "true") {
        alert("Order canceled");
        fetchData(); 
      } else {
        alert('Data not found');
      }
    } catch (e) {
      alert(e);
    }
  };

  const confirm = async (orderId) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/confirm-order`, { orderId });
      if (response.data === "true") {
        alert("Order confirmed");
        fetchData(); 
      } else {
        alert('Data not found');
      }
    } catch (e) {
      alert(e);
    }
  };

  const handleMain = (e) => {
    history("/print", { state: { data: e } });
  };

  const viewHandle = (e) => {
    setViewData(e.cart_data || []);
    setTotal(e.payment.total || 0);
    setView(true);
  };

  return (
    <>
      <div className='order-container'>
        <div className='cont-rec'>
          <h3 className='main-title'>All Pending Orders</h3>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((e, i) => (
              <div key={i}>
                <div className='order-main'>
                  <div className='order1'>
                    <p>{e.bill_address.name}</p>
                    <p className='center'><BiSolidPhoneCall />{e.bill_address.mobile}</p>
                    <p className='center'><FaIndianRupeeSign />{e.payment.total}</p>
                  </div>
                  <div>
                    <div className='order-addr'>
                      <FaLocationDot />{`${e.bill_address.address} ${e.bill_address.city} ${e.bill_address.state} ${e.bill_address.pin}`}
                    </div>
                  </div>
                  <div className='btn-group'>
                    <button className='view' onClick={() => viewHandle(e)}>View</button>
                    <button className='Print' onClick={() => handleMain(e)}>Print</button>
                    <button className='confirm' onClick={() => confirm(e._id)}>Confirm</button>
                    <button className='cancel' onClick={() => cancel(e._id)}>Cancel</button>
                  </div>
                </div>
                {view && (
                  <>
                    <div className='popup-overlay'></div>
                    <div className='popup'>
                    <HiX className="popup-close" onClick={() => setView(false)} />
                            <p className='popup-title'>Order Details</p>
                      <div className='rec-table'>
                        <table>
                          <thead>
                            <tr>
                              <th>Item</th>
                              <th>Qty</th>
                              <th>Price</th>
                              <th>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            
                            {viewData.map((item, index) => (
                              <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity * item.price}</td>
                              </tr>
                            ))}
                            <tr>
                              <td colSpan="2"></td>
                              <td>Total</td>
                              <td>{total}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className='btn-popup'>
                        <button className='view' onClick={() => handleMain(e)}>Print</button>
                        <button className='confirm' onClick={() => confirm(e._id)}>Confirm</button>
                        <button className='cancel' onClick={() => cancel(e._id)}>Cancel</button>
                      </p>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <div className='admin-loading'><Loading /></div> 
          )}
        </div>
      </div>
    </>
  );
};

export default RecOrder;
