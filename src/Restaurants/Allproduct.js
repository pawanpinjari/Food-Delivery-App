import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./Restaurant.css"
import { AiFillDelete } from 'react-icons/ai';
import { GrEdit } from 'react-icons/gr';
import { BiRupee } from 'react-icons/bi';
import { useSelector } from 'react-redux';
const Allproduct = (props) => {
    const[data,setData]=useState("")
    const token = useSelector(state => state.token);
    useEffect(() => {
      try {
          axios.post("http://localhost:8000/allfood", {}, {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          })
          .then(res => {
              if (res.data) {
                  setData(res.data);
                  
              } else {
                  alert("data not found");
              }
          })
          .catch(e => {
              console.log("error", e);
          });
      } catch (e) {
          console.log("error", e);
      }
  }, [token]);
  
    
    
    async function onDelete(e){
      const id=e;
     
      try{

        await axios.post("http://localhost:8000/foodDelete",{id})
        .then(res=>{
          
            if(res.data=="exit"){
              alert("Delete successfully")
            }
            else if(res.data==="notexist"){
              alert("something Wrong")
            }
        })
        .catch(e=>{
            alert("wrong details")
            
        })
  
    }
    catch(e){
      alert("something Wrong")
  
    }
    }

    return (
      <div className='order-container' >
        <div className="all-product">
            
          <h3 className='main-title'>Our All Product in Sweetly</h3>
         {
          Array.isArray(data) && data.length > 0 ? (
            data.map((e,i)=>(
              
              <div className='data-disp' key={i}>
                  <div className='div-image'>
                    <img src={`${e.image}`} alt="" className='data-image'/>
                  </div>
                  <div className='div-data'>
                    <div className='data-name'>{e.name}</div>
                    <div className='data-dec'>category:{e.category}</div>
                    <div className='data-price'>Price:{e.price}<BiRupee /></div>
                  </div>
                  <div className='data-button'>
                    <AiFillDelete  className='data-delete' onClick={()=>{onDelete(e.id)}}/> 
                  </div>
              </div>
            ))
          ):(
            <div>
              <h1>Add Food First</h1>
            </div>
          )
         }
    
        </div>
        </div>
      );
    };
    
    

export default Allproduct
