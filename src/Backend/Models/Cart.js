const Mongoose = require("mongoose");
const cartSchema = Mongoose.Schema({
  title: String,
  price: Number,
  quantity: Number
});
const cartModel = Mongoose.model("Cart", cartSchema);
module.exports = cartModel;
