const express = require("express")
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
const collections = require("./Userschema/mongo")
const bodyParser = require("body-parser");
const rest = require("./Userschema/rest")
const data = require("./Userschema/menudata")
const order=require("./Userschema/order")
const cors = require("cors");
const update = require("./Userschema/user_update");
const { ObjectId } = require("mongodb");
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get("/login", cors(), (req, res) => {

})
app.get("/home", cors(), (req, res) => {

})

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null,'../public/images')
    },
    filename: (req, file, callback) => {
      callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  });

  const upload = multer({ storage });

app.post("/login", async (req, res) => {
    const { email, password } = req.body


    try {
        const check = await collections.findOne({ email: email,password: password  })
      

        if (check) {
            res.json([check])
        }
        else {
            res.json("notexist")
        }

    }
    catch (e) {
        res.json("fail")
    }

})



app.post("/signup", async (req, res) => {
    const { name, email, mobile, password } = req.body
  
    const data = {
        name: name,
        email: email,
        mobile: mobile,
        password: password
    }
  console.log(data)
    try {
        const check = await collections.findOne({ email: email,password: password })

        if (check) {
            res.json("exist")
        }
        else {
            
            res.json([data])
            await collections.insertMany([data])
        }

    }
    catch (e) {
        console.log(e)
        res.json("please insert correct details")
    }

})

app.post("/user_update",upload.single('file'), async (req, res) => {
    const { email,addr} = req.body
    const image=req.file;
    const data = {
        address: addr,
        image:image.filename
    }
    console.log(data)
    const query = { email: email };
    const updateData = { $set: data }; 
    try {
        const check = await collections.findOne({ email: email})
       console.log(check)
        if (check) {
         const insert=  await collections.updateOne(query, updateData,{upsert:true})

         console.log(insert)
        }
        else {
            res.json(data)
            // await collections.insertMany([data])
        }

    }
    catch (e) {
        console.log(e)
        res.json("please insert correct details")
    }

})


app.post("/home", async (req, res) => {
    try {
        const data1 = await rest.find()
        if (data1) {
            res.json(data1)
        }
        else{
            res.json("notexist")
        }
    }
    catch (e) {
        console.log("data" + e)
    }

})



app.post("/rest_login", async (req, res) => {
    const { email, password } = req.body


    try {
        const check = await rest.findOne({ email: email,password: password})
       console.log(check)

        if (check) {
            res.json([check])
        }
        else {
            res.json("notexist")
        }

    }
    catch (e) {
        res.json("fail")
    }

})



app.post("/rest_signup",upload.single('file'), async (req, res) => {
    const { name, addr,city, email, mobile,desc, password } = req.body
    const image=req.file;
    console.log(image)
    // console.log(name)
    const data1 = {
        name: name,
        addr:addr,
        email: email,
        mobile: mobile,
        city:city,
        desc:desc,
        image: image.filename,
        password: password
    }
    console.log(data1)
    try {
        const check = await rest.findOne({name: name})
   
        if (check) {
            res.json("exist")
        }
        else {
            res.json("notexist")
            await rest.insertMany([data1])
        }

    }
    catch (e) {
        console.log(e)
        res.json("please insert correct details")
    }

})

app.post("/add",upload.single('file'), async (req, res) => {
    const {id, name, price,dec, category,rest_name } = req.body
    const image=req.file;
    const path=req.file.path;
    console.log(image)
    console.log(path)
    const data1 = {
        image: image.filename,
        id:id,
        name: name,
        category: category,
        price:price,
        description: dec,
        rest_name:rest_name
    }
    console.log(data1)
    try {
        const check = await data.insertMany([data1])
   console.log(check)
        if (check) {
            res.json("exist")
        }
        else {
            res.json("notexist")
           
        }

    }
    catch (e) {
        console.log(e)
        res.json("please insert correct details")
    }

})
app.post("/allData", async (req, res) => {
    const { name } = req.body;  
    try {
        const check=await data.find({rest_name:name})
        if(check){
            res.json(check)
        }
        else{

            res.json("notexist" ); 
        }
    } catch (error) {
        console.error("Error:", error);
        res.json("Internal Server Error" );
    }
});

app.post("/foodDelete", async (req, res) => {
    const { id } = req.body;  
    console.log(id)
    console.log(typeof(id))
    try {
        const check = await data.deleteOne({ id: id });
        console.log(check)
        if(check){
            res.json(check)
        }
        else{
            res.json("notexist" ); 
        }
    } catch (error) {
        console.error("Error:", error);
        res.json("Internal Server Error" );
    }
});

app.post("/order", async (req, res) => {
    const { restName,status, LogData,cart_data, bill_address, payment}=req.body
    const data = {
        restName:restName,
        status:status,
        LogData: LogData,
        cart_data:cart_data,
        bill_address:bill_address,
        payment:payment
      };
     
    try {
        const check = await order.insertMany([data])
       console.log(check)
        if (check) {
            res.json("exist")
        }
        else {
            res.json("notexist")
           
        }
    } catch (error) {
        console.error("Error:", error);
        res.json("Internal Server Error" );
    }
});


app.post("/rec_order",async(req, res)=>{
    const name=req.body.name
    const check=await order.find({restName:name})
    
    if (check) {
        res.json(check)
    }
    else {
        res.json("notexist")
       
    }
})
app.post("/cancel-order",async(req,res)=>{
    const orderId = req.body.orderId;
    console.log("Order ID to delete:", orderId);
    try{
        const result = await order.updateOne({ _id: new ObjectId(orderId) },{$set:{status:"cancel"}},{upsert:true},{ returnDocument: 'after' } );
       console.log(result)
        if(result.acknowledged==true){
            res.json("true")
        }
        else{
            res.json("false")
        }
    }
    catch(e){
        console.log(e)
    }
})
app.post("/confirm-order",async(req,res)=>{
    const orderId = req.body.orderId;
    console.log("Order ID confirm:", orderId);
    try{
        const result = await order.updateOne({ _id: new ObjectId(orderId) },{$set:{status:"confirm"}},{upsert:true},{ returnDocument: 'after' } );
       console.log(result)
        if(result.acknowledged==true){
            res.json("true")
        }
        else{
            res.json("false")
        }
    }
    catch(e){
        console.log(e)
    }
})
app.listen(8000, () => {
    console.log("port connected");
})

