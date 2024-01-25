import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./Restaurant.css"
import { AiFillDelete } from 'react-icons/ai';
import { GrEdit } from 'react-icons/gr';
import { BiRupee } from 'react-icons/bi';

const Allproduct = (props) => {
    const[data,setData]=useState("")
   const name=props.Name
    useEffect(() => {
        try {
            axios.post("http://localhost:8000/allData",{name})
                .then(res => {
                    if (res.data) {
                        setData(res.data);
                        console.log("data",res.data)
                    } else {
                        console.log("data not found");
                    }
                })
                .catch(e => {
                    console.log("error", e);
                });
        } catch (e) {
            console.log("error", e);
        }
    }, [props.Name]);
    
    
    async function onDelete(e){
      const id=e;
      console.log(id)
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
            console.log(e);
        })
  
    }
    catch(e){
        console.log(e);
  
    }
    }

    return (
        <div className="all-product">
          <h1>Our Product in Sweetly</h1>
            
         {
          Array.isArray(data) && data.length > 0 ? (
            data.map((e,i)=>(
              
              <div className='data-disp'>
                  <div className='div-image'>
                    <img src={`/images/${e.image}`} alt="" className='data-image'/>
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
      );
    };
    
    

export default Allproduct
