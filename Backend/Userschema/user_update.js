const mongoose = require("../config.js")

const newSchema1=new mongoose.Schema({

    image:{
        type:String
        // type:String,
        // required:true
    },
    address:{
        type:String
        // required:true
    }
})

const update=mongoose.model("update",newSchema1)
module.exports=update