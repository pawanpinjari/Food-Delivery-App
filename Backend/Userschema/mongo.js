
const mongoose = require("../config.js")

const newSchema=new mongoose.Schema({
    name:{
        type: String,
        // required:true
    },
    email:{
        type:String,
        // required:true
    },
    mobile:{
        type : Number,
        // required:true
    },
    address:{
        type:String
        // required:true
    },
    password:{
        type:String,
        // required:true
    },
    
    image:{
        type:String
        // type:String,
        // required:true
    }
    
})


const collections = mongoose.model("collections",newSchema)


module.exports=collections