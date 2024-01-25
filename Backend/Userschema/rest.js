
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
        // required:true
    },
    image:{
        type:String,
        // required:true
    },
    password:{
        type:String,
        // required:true
    }
})


const rest = mongoose.model("rest",newSchema)


module.exports=rest