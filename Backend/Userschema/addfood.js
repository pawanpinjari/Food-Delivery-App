const mongoose = require("../config.js")

const newSchema1=new mongoose.Schema({
    restId:{
        type:String
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
    }
   
    
})

const addfood=mongoose.model("addfood",newSchema1)
module.exports=addfood