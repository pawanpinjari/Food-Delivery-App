import React, {useState } from 'react'
import "./Restaurant.css"
import axios from 'axios'
import { useSelector } from 'react-redux';

const Addproduct = (props) => {
  const token = useSelector(state => state.token);
  const[name,setName]=useState('')
  const[price,setPrice]=useState('')
  const[category,setCategory]=useState('')
  const[dec,setDec]=useState('')
  const[image,setImage]=useState('')

  async function submit(e) {
    e.preventDefault();

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/add-food`, {name,price,category,dec,image}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (res.data) {
        
        alert("added successfully");
      } else if (res.data === "notexist") {
        alert("something Wrong");
      }
    } catch (error) {
      
      alert("Something went wrong while adding the food");
    }
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className='order-container' >
      <div className='container-add'>
            <div className=' main1'>
         <h3>Add Menu</h3>
                <form action="POST">
                   <label htmlFor="file">Food Name</label> <br />
                    <input type="text" className="box" id="name" placeholder="Food Name" onChange={(e)=>{setName(e.target.value)}}/> <br />
                    <label htmlFor="file">Food Price</label> <br />
                    <input type="text" className="box" id="addr" placeholder="Price"  onChange={(e)=>{setPrice(e.target.value)}}/> <br />
                    <label htmlFor="file">Food Category</label> <br />
                    <input type="text" className='box'  onChange= {(e) => { setCategory(e.target.value) }} placeholder="Category" /> <br />
                    <label htmlFor="file">Food Description</label> <br />
                    <input type="text" className="box" id="phno" placeholder="Description"  onChange={(e)=>{setDec(e.target.value)}}/> <br />
                   
                    <label htmlFor="file">Add Food Poster</label> <br />
                   <input type="file" name="" id="file" title='choose food poster' onChange={handleImageChange}/>  <br />
                    <input type="submit" value="Add" id="submit" onClick={submit}/> 
                    
            
                </form>

            </div>
    </div>
    </div>
  )
}

export default Addproduct
