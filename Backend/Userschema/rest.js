
const mongoose = require("../config.js")

const newSchema=new mongoose.Schema({
    name:{
        type: String,
       
    },
    addr:{
        type: String,
       
    },
    email:{
        type:String,
      
    },
    city:{
        type:String,
      
    },
    desc:{
        type:String,
      
    },
    mobile:{
        type : Number,
       
    },
    image:{
        type:String,

    },
    password:{
        type:String,
        
    }
})


const rest = mongoose.model("rest",newSchema)


module.exports=rest