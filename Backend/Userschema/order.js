const mongoose = require("../config.js")


const addressSchema = new mongoose.Schema({
  name: String,
  mobile: Number,
  address: String,
  city: String,
  state: String,
  pin: String,
  orderDate: {
    type: Date,
    default: function() {
      const indianTimeOffset = 5.5 * 60 * 60 * 1000;
      return new Date(Date.now() + indianTimeOffset);
    }
  }
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: Number,
  password: String,
  address: String,
  image: String
});

const itemSchema = new mongoose.Schema({
  id: String,
  name: String,
  price: String,
  image: String,
  quantity: Number
  
});

const paymentSchema = new mongoose.Schema({
  total: Number,
  paymentID:String,
  orderID:String,
  signature:String,
  orderDate: {
    type: Date,
    default: function() {
      const indianTimeOffset = 5.5 * 60 * 60 * 1000;
      return new Date(Date.now() + indianTimeOffset);
    }
  }
});

const orderSchema = new mongoose.Schema({
  restId: String,
  custId: String,
  cart_data: [itemSchema],
  bill_address: addressSchema,
  payment: paymentSchema,
  status:String
});

const order = mongoose.model('Order', orderSchema);

module.exports = order;





