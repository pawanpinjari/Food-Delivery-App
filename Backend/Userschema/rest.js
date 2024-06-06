
const mongoose = require("../config.js")

const newSchema=new mongoose.Schema({
    name:{
        type: String,
        required:true
       
    },
    addr:{
        type: String,
        required:true
       
    },
    email:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    mobile:{
        type : Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})


const rest = mongoose.model("rest",newSchema)


module.exports=rest