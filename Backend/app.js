const express = require("express")
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
const user = require("./Userschema/user")
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const rest = require("./Userschema/rest")
const addfood = require("./Userschema/addfood")
const order = require("./Userschema/order")
require('dotenv').config();
const cors = require("cors");
const { ObjectId } = require("mongodb");
const auth = require("./Middlwares/userAuth");
const restAuth = require("./Middlwares/restAuth");
const userAuth = require("./Middlwares/userAuth");
const Razorpay = require("razorpay");
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
    const { email, password } = req.body;

    try {
       
        const existingUser = await user.findOne({ email: email });

        if (!existingUser) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: existingUser._id.toString() },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' } 
        );

        return res.status(200).json({ user: existingUser, token: token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Login failed, please try again" });
    }
});


app.post("/signup", async (req, res) => {
    const { name, email, mobile, password } = req.body;

    try {
        
        const existingUser = await user.findOne({ email: email });
        
        if (existingUser) {
            return res.json("notexist")
        }

  
        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        
        const newUser = await user.create({
            name: name,
            email: email,
            mobile: mobile,
            password: hashedPassword
        });
        
        const token = jwt.sign(
            { userId: newUser._id.toString() },
            process.env.JWT_SECRET_KEY
        );

        return res.status(201).json({ user: newUser, token: token });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Error signing up. Please try again." });
    }
});

app.post("/user_update", async (req, res) => {
    const { email, addr,image } = req.body

    const data = {
        address: addr,
        image: image
    }

    const query = { email: email };
    const updateData = { $set: data };
    try {
        const check = await user.findOne({ email: email })
        if (check) {
            const insert = await user.updateOne(query, updateData, { upsert: true })
            if (insert.modifiedCount > 0 || insert.upsertedCount > 0) {
                return res.json("exist");
            } else {
                return res.json("no changes");
            }
            
        }
        else {
            return res.json(data)

        }

    }
    catch (e) {
        
        return res.json("please insert correct details")
    }

})

app.post("/home", async (req, res) => {
    try {
        const data1 = await rest.find()
        if (data1) {

            return res.json(data1)
        }
        else {
            return res.json("notexist")
        }
    }
    catch (e) {
        return res.json("please insert correct details")
    }

})

app.post("/rest_login", async (req, res) => {
    const { email, password } = req.body;

    try {

        const user = await rest.findOne({ email: email });
        
        if (!user) {
            return res.json("exist");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.json("notexist");
        }

        const token = jwt.sign(
            { userId: user._id.toString() },
            process.env.JWT_SECRET_KEY
        );

        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        return res.status(200).json({ user: userWithoutPassword, token: token });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Login failed. Please try again." });
    }
});


app.post("/rest_signup", async (req, res) => {
    const { name, addr, city, email, mobile, desc, image, password } = req.body;

    try {

        const check = await rest.findOne({  email: email });

        if (check) {
            return res.json("exist")
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await rest.create({
            name: name,
            addr: addr,
            city: city,
            email: email,
            mobile: mobile,
            desc: desc,
            image: image,
            password: hashedPassword
        });

 
        const token = jwt.sign(
            { userId: newUser._id.toString() },
            process.env.JWT_SECRET_KEY
        );


        const userWithoutPassword = newUser.toObject();
        delete userWithoutPassword.password;

        return res.status(201).json({ user: userWithoutPassword, token: token });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Please insert correct details" });
    }
});


app.post("/add-food", restAuth, async (req, res) => {
    const { name, image, price, dec, category } = req.body
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
      
        if (check) {
            return res.json("exist")
        }
        else {
            return res.json("notexist")

        }

    }
    catch (e) {

        return res.json("please insert correct details")
    }

})
app.post("/allfood", restAuth, async (req, res) => {

    try {
        const check = await addfood.find({ restId: req.restId })
        if (check) {

            return res.json(check)
        }
        else {

            return res.json("notexist");
        }
    } catch (error) {
        
        return res.json("Internal Server Error");
    }
});
app.post("/allItem", async (req, res) => {
    const restId = req.body.restId
    try {
        const check = await addfood.find({ restId: restId })
        if (check) {
            
            return res.json(check)
        }
        else {

            return res.json("notexist");
        }
    } catch (error) {
       
        return res.json("Internal Server Error");
    }
});
app.post("/foodDelete", async (req, res) => {
    const { id } = req.body;

    try {
        const check = await data.deleteOne({ id: id });

        if (check) {
            return res.json(check)
        }
        else {
            return res.json("notexist");
        }
    } catch (error) {
  
        return res.json("Internal Server Error");
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
            return res.json("exist")
        }
        else {
            return res.json("notexist")

        }
    } catch (error) {

        return res.json("Internal Server Error");
    }
});


app.post("/userOrder", userAuth, async (req, res) => {
    const userID = req.user._id;
  

    try {
        const orders = await order.find({ custId: userID }).sort({ "payment.orderDate": -1 }).lean();

        if (orders.length === 0) {
            return res.json("No Data");
        }

        const data = await Promise.all(
            orders.map(async (order) => {
                const restaurant = await rest.findById(order.restId).lean(); 
                return {
                    restname: restaurant ? restaurant.name : "Unknown",
                    price: order.payment.total,
                    status: order.status
                };
            })
        );
      
        return res.json(data);
    } catch (error) {
        return res.status(500).json("Server Error");
    }
});



app.post("/orderpayment", async (req, res) => {
    try {
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_SECRET,
      });
  
      const options = req.body;
      const order = await razorpay.orders.create(options);
  
      if (!order) {
        return res.status(500).send("Error");
      }
  
      res.json(order);
    } catch (err) {

        return res.json("Error");
    }
  });
app.post("/rec_order", restAuth, async (req, res) => {
    const check = await order.find({ restId: req.restId , status: "pending" })

    if (check) {
        return res.json(check)
    }
    else {
        return res.json("notexist")

    }
})
app.post("/confirmed-order", restAuth, async (req, res) => {
    const check = await order.find({ restId: req.restId , status: "confirm" })

    if (check) {
        return res.json(check)
    }
    else {
        return res.json("notexist")

    }
})
app.post("/cancelled-order", restAuth, async (req, res) => {
    const check = await order.find({ restId: req.restId , status: "cancel" })

    if (check) {
        return res.json(check)
    }
    else {
        return res.json("notexist")

    }
})
app.post("/cancel-order", async (req, res) => {
    const orderId = req.body.orderId;
    try {
        const result = await order.updateOne({ _id: new ObjectId(orderId) }, { $set: { status: "cancel" } }, { upsert: true }, { returnDocument: 'after' });

        if (result.acknowledged == true) {
            return res.json("true")
        }
        else {
            return res.json("false")
        }
    }
    catch (e) {
        return res.json("please insert correct details")
    }
})
app.post("/confirm-order", async (req, res) => {
    const orderId = req.body.orderId;
 
    try {
        const result = await order.updateOne({ _id: new ObjectId(orderId) }, { $set: { status: "confirm" } }, { upsert: true }, { returnDocument: 'after' });

        if (result.acknowledged == true) {
            return res.json("true")
        }
        else {
            return res.json("false")
        }
    }
    catch (e) {
        return res.json("please insert correct details")
    }
})
app.post("/admin",async(req,res)=>{
    try {
        const users = await user.find({}, { password: 0 });
        const restaurants = await rest.find({}, { password: 0 });
        const receivedOrders = await order.find({ });
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
        
        return res.status(500).json("Internal Server Error");
    }
})
app.listen(8000, () => {
    console.log("port connected 8000");
})

