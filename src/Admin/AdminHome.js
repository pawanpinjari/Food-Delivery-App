import React, { useEffect, useState } from 'react';
import Adminnav from './Adminnav';
import Dashboard from './Dashboard';
import Users from './Users';
import Earning from './Earning';
import Received from './Received';
import Confirm from './Confirm';
import Cancelled from './Cancelled';
import AllRest from './AllRest';
import axios from 'axios';
import Sidebar from './Sidebar';

import Loading from '../Components/Loading';
const AdminHome = () => {
  const [navCon, setNavCon] = useState("dashboard");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin`);
        if (response.data) {
          setData(response.data);
        } else {
          alert("data not found");
        }
      } catch (error) {
        alert("Something went wrong while fetching admin data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const navContent = (navContent) => {
    setNavCon(navContent);
  }



  return (
    <div>
      <div>
        <Adminnav navContent={navContent} />
      </div>
      <div className='admin-home'>
        <div>
          <Sidebar navContent={navContent} />
        </div>
        <div className='admin-box'>

          {
            loading ?  (<div className='admin-loading'><Loading/></div> ):
          data ?( navCon === "users" ? (<Users UserData={data.users} />) :
              navCon === "restaurants" ? (<AllRest RestData={data.restaurants} />) :
                navCon === "earnings" ? (<Earning ConfOrder={data.confirmedOrders} />) :
                  navCon === "received" ? (<Received RecOrder={data.receivedOrders} />) :
                    navCon === "confirm" ? (<Confirm ConfOrder={data.confirmedOrders} />) :
                      navCon === "cancelled" ? (<Cancelled ConcOrder={data.cancelledOrders} />) : 
                      (<Dashboard navContent={navContent} data={data} />)
          ):(<div>data not found</div>)
        }
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
