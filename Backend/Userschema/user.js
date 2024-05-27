
const mongoose = require("../config.js")

const newSchema=new mongoose.Schema({
    name:{
        type: String,
      
    },
    email:{
        type:String,
      
    },
    mobile:{
        type : Number,
 
    },
    address:{
        type:String

    },
    password:{
        type:String,

    },
    
    image:{
        type:String
      
    }
    
})


const user = mongoose.model("user",newSchema)


module.exports=user