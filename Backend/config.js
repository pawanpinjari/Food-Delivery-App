const mongoose=require("mongoose")
require('dotenv').config();
const URL=process.env.MONGO_URL;

mongoose.connect(URL)
.then(()=>{
    console.log("mongodb connected");
})
.catch((e)=>{
    console.log('failed',e);
})

module.exports=mongoose

