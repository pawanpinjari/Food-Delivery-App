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
  id: Number,
  name: String,
  price: String,
  image: String,
  quantity: Number
  
});

const paymentSchema = new mongoose.Schema({
  total: Number,
  card_holder: String,
  card_number: String,
  card_expMonth: String,
  card_expYear: String,
  card_cvv: String
});

const orderSchema = new mongoose.Schema({
  restName: String,
  status:String,
  LogData: [userSchema],
  cart_data: [itemSchema],
  bill_address: addressSchema,
  payment: paymentSchema
});

const order = mongoose.model('Order', orderSchema);

module.exports = order;





