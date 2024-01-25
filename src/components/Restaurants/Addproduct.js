import React, { useEffect, useState } from 'react'
import "./Restaurant.css"
import axios from 'axios'
import { useNavigate } from 'react-router';

const Addproduct = (props) => {
  const history=useNavigate();
 
  const[id,setId]=useState('')
  const[name,setName]=useState('')
  const[price,setPrice]=useState('')
  const[category,setCategory]=useState('')
  const[dec,setDec]=useState('')
  const[image,setImage]=useState('')
  const[rest_name,setRest_name]=useState(props.Name)

  useEffect(()=>{
  
    const min = 1000;
    const max = 9999;
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    setId(randomNum);
    console.log(randomNum)

},[])
  async function submit(e){
    e.preventDefault();
    const formData = new FormData();
   formData.append('id', id);
   formData.append('file', image);
   formData.append('name', name);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('dec', dec);
    formData.append('rest_name', rest_name);
   
    try{

      await axios.post("http://localhost:8000/add",formData)
      .then(res=>{
        console.log(res.data)
          if(res.data){
            alert("added successfully")
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
                    <input type="file" name="" id="file" title='choose food poster'  onChange={(e)=>{setImage(e.target.files[0])}}/>  <br />
                    <input type="submit" value="Add" id="submit" onClick={submit}/> 
                    
            
                </form>

            </div>
    </div>
  )
}

export default Addproduct
