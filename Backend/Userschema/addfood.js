const mongoose = require("../config.js")

const newSchema1=new mongoose.Schema({
    restId:{
        type:String,
        required:true
    },
    image:{
        type:String,
       required:true
        
    },
    name:{
        type:String,
        required:true
       
    },
    category:{
        type:String,
        required:true
       
    },
    price:{
        type:String,
        required:true
         
    },
    description:{
        type:String,
        required:true
    }
   
    
})

const addfood=mongoose.model("addfood",newSchema1)
module.exports=addfood