import React, {  useState } from 'react';
import NavRest from './NavRest';
import "./Restaurant.css";
import Addproduct from './Addproduct';
import Allproduct from './Allproduct';
import RecOrder from './RecOrder';
import ConfirmOrder from './ConfirmOrder';
import CancelOrder from './CancelOrder';
import Footer from '../Footer';

const Restaurant = () => {
  const [navData, setNavData] = useState("rec_order");

  const Nav_Content = (e) => {
    setNavData(e);
  };

  return (
    <>
      <div className='restaurant'>
        <NavRest Nav_Content={Nav_Content}></NavRest>
        {
         
            navData === "rec_order" ? (
              <RecOrder ></RecOrder>
            ) : navData === "confirm-order" ? (
              <ConfirmOrder></ConfirmOrder>
            ) : navData === "cancel-order" ? (
              <CancelOrder />
            ) : navData === "add" ? (
              <Addproduct  />
            ) : (
              <Allproduct  />
            )
          
        }
      </div>
      <Footer />
    </>
  );
};

export default Restaurant;
