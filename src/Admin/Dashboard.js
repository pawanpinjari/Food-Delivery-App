import React, { useEffect, useState } from 'react'
import "./admin.css"
const Dashboard = (props) => {
 const[allData,setData]=useState(props.data)
 const [View, setView] = useState(false)
 const [total, setTotal] = useState(false)

 const countTotal =()=>{
  let totalPayment = 0;
  allData && allData.confirmedOrders.forEach((order) => {
    if (order.payment && order.payment.total) {
      totalPayment += order.payment.total;
    }
    
  });

  let result = Math.floor(totalPayment);
  setTotal(result)
};
 useEffect(() => {
  setData(props.data);
}, [props.data]);

setTimeout(()=>{
  setView(true)
    countTotal();

  },500)
  return (
    <div>
      {
          View &&  <div className="dashboard">
          <div className="dashboard-box">
            <h3>Order statistics</h3>
            <div className="dashboard-sub-box" >
              
              <div className="sub-box-item" onClick={()=>props.navContent("users")}>
                <li>Users</li>
                <li>{allData.users.length}</li>
                <li>View all</li>
              </div>
              <div className="sub-box-item" onClick={()=>props.navContent("restaurants")}>
                <li>Restaurant</li>
                <li>{allData.restaurants.length}</li>
                <li>View all</li>
              </div>
              <div className="sub-box-item" onClick={()=>props.navContent("earnings")}>
                <li>Earnings</li>
                <li>{total}</li>
                <li>View all</li>
              </div>
              <div className="sub-box-item" onClick={()=>props.navContent("received")}>
                <li>Received</li>
                <li>{allData.receivedOrders.length}</li>
                <li>View all</li>
              </div>
              <div className="sub-box-item" onClick={()=>props.navContent("confirm")}>
                <li>Confirm</li>
                <li>{allData.confirmedOrders.length}</li>
                <li>View all</li>
              </div>
              <div className="sub-box-item" onClick={()=>props.navContent("cancelled")}>
                <li>Cancelled</li>
                <li>{allData.cancelledOrders.length}</li>
                <li>View all</li>
              </div>
            </div>
          </div>
        </div>
      }
     
    </div>
  )
}

export default Dashboard
