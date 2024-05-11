const express = require("express")
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
const user = require("./Userschema/user")
const bodyParser = require("body-parser");
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const rest = require("./Userschema/rest")
const addfood = require("./Userschema/addfood")
const order = require("./Userschema/order")
require('dotenv').config();
const cors = require("cors");
const update = require("./Userschema/user_update");
const { ObjectId } = require("mongodb");
const auth = require("./Middlwares/userAuth");
const restAuth = require("./Middlwares/restAuth");
const userAuth = require("./Middlwares/userAuth");
const app = express()


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors())





app.get("/login", cors(), (req, res) => {

})
app.get("/home", cors(), (req, res) => {

})




const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, '../public/images')
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

app.post("/login", async (req, res) => {
    const { email, password } = req.body


    try {
        const users = await user.findOne({ email: email, password: password })

        if (users) {

            console.log("user", users)
            const token = jwt.sign({
                userId: users._id.toString()
            }, process.env.JWT_SECRET_KEY);

            res.json({ user: users, token: token });
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
        const check = await user.findOne({ email: email, password: password })

        if (check) {
            res.json("exist")
        }
        else {
            const newUser = await user.create(data);
            console.log(newUser);

            const token = jwt.sign({
                userId: newUser._id.toString()
            }, process.env.JWT_SECRET_KEY);

            res.json({ user: newUser, token: token });


        }

    }
    catch (e) {
        console.log(e)
        res.json("please insert correct details")
    }

})

app.post("/user_update", upload.single('file'), async (req, res) => {
    const { email, addr } = req.body
    const image = req.file;
    const data = {
        address: addr,
        image: image.filename
    }
    console.log(data)
    const query = { email: email };
    const updateData = { $set: data };
    try {
        const check = await user.findOne({ email: email })
        console.log(check)
        if (check) {
            const insert = await user.updateOne(query, updateData, { upsert: true })

            console.log(insert)
        }
        else {
            res.json(data)

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
        else {
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
        const check = await rest.findOne({ email: email, password: password })
        console.log(check)

        if (check) {
            const token = jwt.sign({
                _Id: check._id.toString()
            }, process.env.JWT_SECRET_KEY);

            res.json({ user: check, token: token })
        }
        else {
            res.json("notexist")
        }

    }
    catch (e) {
        res.json("fail")
    }

})



app.post("/rest_signup", async (req, res) => {
    const { name, addr, city, email, mobile, desc, image, password } = req.body

    const data1 = {
        name: name,
        addr: addr,
        email: email,
        mobile: mobile,
        city: city,
        desc: desc,
        image: image,
        password: password
    }

    try {
        const check = await rest.findOne({ name: name })

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

app.post("/add-food", restAuth, async (req, res) => {
    const { name, image, price, dec, category } = req.body
    console.log(req.restId)
    const data1 = {
        restId: req.restId,
        name: name,
        category: category,
        price: price,
        description: dec,
        image: image
    }

    try {
        const check = await addfood.insertMany(data1)
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
app.post("/allfood", restAuth, async (req, res) => {

    try {
        const check = await addfood.find({ restId: req.restId })
        if (check) {

            res.json(check)
        }
        else {

            res.json("notexist");
        }
    } catch (error) {
        console.error("Error:", error);
        res.json("Internal Server Error");
    }
});
app.post("/allItem", async (req, res) => {
    const restId = req.body.restId
    try {
        const check = await addfood.find({ restId: restId })
        if (check) {

            res.json(check)
        }
        else {

            res.json("notexist");
        }
    } catch (error) {
        console.error("Error:", error);
        res.json("Internal Server Error");
    }
});
app.post("/foodDelete", async (req, res) => {
    const { id } = req.body;
    console.log(id)
    console.log(typeof (id))
    try {
        const check = await data.deleteOne({ id: id });
        console.log(check)
        if (check) {
            res.json(check)
        }
        else {
            res.json("notexist");
        }
    } catch (error) {
        console.error("Error:", error);
        res.json("Internal Server Error");
    }
});

app.post("/order", userAuth, async (req, res) => {
    const { restId, status, cart_data, bill_address, payment } = req.body
    const userID1 = req.user._id;
    const data = {
        restId: restId,
        custId: userID1,
        cart_data: cart_data,
        bill_address: bill_address,
        payment: payment,
        status: status

    };

    try {
        const check = await order.insertMany([data])

        if (check) {
            res.json("exist")
        }
        else {
            res.json("notexist")

        }
    } catch (error) {
        console.error("Error:", error);
        res.json("Internal Server Error");
    }
});


app.post("/rec_order", restAuth, async (req, res) => {
    const check = await order.find({ restId: req.restId , status: "pending" })

    if (check) {
        res.json(check)
    }
    else {
        res.json("notexist")

    }
})
app.post("/confirmed-order", restAuth, async (req, res) => {
    const check = await order.find({ restId: req.restId , status: "confirm" })

    if (check) {
        res.json(check)
    }
    else {
        res.json("notexist")

    }
})
app.post("/cancelled-order", restAuth, async (req, res) => {
    const check = await order.find({ restId: req.restId , status: "cancel" })

    if (check) {
        res.json(check)
    }
    else {
        res.json("notexist")

    }
})
app.post("/cancel-order", async (req, res) => {
    const orderId = req.body.orderId;
    console.log("Order ID to delete:", orderId);
    try {
        const result = await order.updateOne({ _id: new ObjectId(orderId) }, { $set: { status: "cancel" } }, { upsert: true }, { returnDocument: 'after' });
        console.log(result)
        if (result.acknowledged == true) {
            res.json("true")
        }
        else {
            res.json("false")
        }
    }
    catch (e) {
        console.log(e)
    }
})
app.post("/confirm-order", async (req, res) => {
    const orderId = req.body.orderId;
    console.log("Order ID confirm:", orderId);
    try {
        const result = await order.updateOne({ _id: new ObjectId(orderId) }, { $set: { status: "confirm" } }, { upsert: true }, { returnDocument: 'after' });
        console.log(result)
        if (result.acknowledged == true) {
            res.json("true")
        }
        else {
            res.json("false")
        }
    }
    catch (e) {
        console.log(e)
    }
})
app.post("/admin",async(req,res)=>{
    try {
        const users = await user.find({}, { password: 0 });
        const restaurants = await rest.find({}, { password: 0 });
        const receivedOrders = await order.find({ status: "pending" });
        const confirmedOrders = await order.find({ status: "confirm" });
        const cancelledOrders = await order.find({ status: "cancel" });

        res.json({
            users: users,
            restaurants: restaurants,
            receivedOrders: receivedOrders,
            confirmedOrders: confirmedOrders,
            cancelledOrders: cancelledOrders
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json("Internal Server Error");
    }
})
app.listen(8000, () => {
    console.log("port connected");
})

