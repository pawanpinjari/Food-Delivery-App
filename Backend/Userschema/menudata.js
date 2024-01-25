const mongoose = require("../config.js")

const newSchema1=new mongoose.Schema({
    id:{
        type:Number
    },
    image:{
        type:String
        
    },
    name:{
        type:String
       
    },
    category:{
        type:String
       
    },
    price:{
        type:String
         
    },
    description:{
        type:String
    },
    rest_name:{
        type:String
    }
   
    
})

const data=mongoose.model("data",newSchema1)
module.exports=data