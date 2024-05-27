const mongoose = require("../config.js")

const newSchema1=new mongoose.Schema({

    image:{
        type:String

    },
    address:{
        type:String
       
    }
})

const update=mongoose.model("update",newSchema1)
module.exports=update