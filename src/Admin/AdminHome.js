import React, { useEffect, useState } from 'react';
import Adminnav from './Adminnav';
import Dashboard from './Dashboard';
import Users from './Users';
import Earings from './Earings';
import Received from './Received';
import Confirm from './Confirm';
import Cancelled from './Cancelled';
import AllRest from './AllRest';
import axios from 'axios';
import Sidebar from './Sidebar';

const AdminHome = () => {
  const [navCon, setNavCon] = useState("dashboard");
  const [Data, setData] = useState()

  useEffect(() => {
    try {
      axios.post("http://localhost:8000/admin")
        .then(res => {
          if (res.data) {
            setData(res.data);
            console.log("data", res.data)
          } else {
            console.log("data not found");
          }
        })
        .catch(error => {
    
          alert("Something went wrong while fetching admin data");
        });
    } catch (error) {
   
      alert("Something went wrong");
    }
  }, []);


  const navContent = (navContent) => {

    setNavCon(navContent);
  }

  return (
    <div >
      <div>
        <Adminnav navContent={navContent} />
      </div>
      <div className='admin-home'>
        <div>
          <Sidebar navContent={navContent}/>
        </div>
        <div className='admin-box'>
          {

            navCon === "users" ? (<Users UserData={Data.users} />) :
              navCon === "restaurants" ? (<AllRest RestData={Data.restaurants}/>) :
                navCon === "earnings" ? (<Earings ConfOrder={Data.confirmedOrders}/>) :
                  navCon === "received" ? (<Received RecOrder={Data.receivedOrders}/>) :
                    navCon === "confirm" ? (<Confirm ConfOrder={Data.confirmedOrders} />) :
                      navCon === "cancelled" ? (<Cancelled ConcOrder={Data.cancelledOrders} />) : (<Dashboard navContent={navContent} data={Data} />)
          }

        </div>
      </div>

    </div>
  );
}

export default AdminHome;
