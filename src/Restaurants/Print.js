import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
const Print = React.forwardRef((props, ref) => {
  const location = useLocation()
  const [data, setData] = useState()
  const [subTotal, setSubTotal] = useState()
  const [GST, setGST] = useState()
  const printRef = useRef();
  const rest = useSelector(state => state.user);

  useEffect(() => {
    const BillData = location.state?.data;
 
    if (BillData) {
      setData(BillData);
  
      const arr2 = [];
      BillData.cart_data.map((ele) => {
        const arr = ele.price * ele.quantity;
        const arr1 = Number(arr);
        arr2.push(arr1);
      });
  
      var total1 = 0;
      for (let i = 0; i < arr2.length; i++) {
        total1 += arr2[i];
      }
  
      setSubTotal(total1);
      const gst = (total1 * 18) / 100;
      const totalAmount = total1 + gst;

      setGST(gst);
     
    }
  
  }, [location.state?.data]);
  const handlePrint = useReactToPrint({
    content: () => printRef.current,

  });
  useEffect(() => {
    if (data) {
      handlePrint();
    }
  }, [data, handlePrint]);
  if (!data || !data.bill_address) {
    return <p>Loading...</p>;
  }
  
  console.log("GST",GST)
  console.log("subtotal",subTotal)
  const orderDate = new Date(data.bill_address.orderDate);
  return (
    <div className="print-data" ref={printRef}>
      <div className="bill-title">
        <h1>Tax Invoice</h1>
      </div>
      <div className="order-details">
        <div>
          <div>
            <b>Order Id:</b> {data._id}
          </div>
          <div>
            <b>Order Date:</b> {orderDate.toLocaleString()}
          </div>
        </div>
        <div>
          <div><b>GSTIN NO. :</b>33GH473885KH</div>
          <div><b>Customer Care NO:</b> +91 7066651454</div>
        </div>
      </div>
      <div className="bill-details">
        <div>
          <h3>Delivery Details</h3>
          <div>
            <b>Customer Name:</b> {data.bill_address.name}
          </div>
          <div>
            <b>Customer Mobile:</b> {data.bill_address.mobile}
          </div>
          <div>
            <b>Delivery Address:</b> {`${data.bill_address.address}, ${data.bill_address.city}, ${data.bill_address.state}, ${data.bill_address.pin}`}
          </div>
        </div>
        <div>
          <h3>Restaurant Details</h3>
          {rest.map((e) => (
        <div key={e._id}>
          <div>
            <b><span>Resto Name: </span></b>
            {e.name}
          </div>
          <div>
            <b><span>Address: </span></b>
            {e.addr}
          </div>
          <div>
            <b><span>Mobile No.: </span></b>
            {e.mobile}
          </div>
        </div>
      ))}

        </div>

      </div>
      <div className="items">
        <h3>Order Items</h3>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {data.cart_data.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>{item.price * item.quantity}</td>
              </tr>
            ))}

          </tbody>
          <tr>
              <td></td>
              <td></td>
              <td><b>Subtotal</b></td>
              <td><b>{subTotal}</b></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td><b>GST</b></td>
              <td><b>{GST}</b></td>
            </tr>
            <tr>
              <th></th>
              <th></th>
              <th><b>Total</b></th>
              <th><b>{data.payment.total}</b></th>
            </tr>
        </table>
      </div>
      <div className="payment-details">

      </div>
      <div className="footer">
        <p><b>Thank you for your purchase!</b></p>
      </div>
    </div>
  );
});

export default Print;
