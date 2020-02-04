const Asyncwrapper = require("../Utils/AsyncWrapper");
const CartModel = require("../Models/Cart");
const AppError = require("../Utils/AppError");

exports.CreateCart = Asyncwrapper(async (req, res, next) => {
  const Cart = new CartModel(req.body);
  await Cart.save();
  if (!Cart) {
    return next(new AppError("Server Is Not Responding", 500));
  }
  res.status(201).json({
    Status: "Success",
    Cart
  });
});

exports.DeleteCart = Asyncwrapper(async (req, res, next) => {
  const DeletedCart = await CartModel.findByIdAndDelete(req.params.Id);
  if (!DeletedCart) {
    return next(new AppError("Not Found :(", 404));
  }
  res.status(201).json({
    Status: "Success",
    DeletedCart
  });
});

exports.GetCart = Asyncwrapper(async (req, res, next) => {
  const Carts = await CartModel.find({});
  res.status(200).send({
    Status: "Success",
    Carts
  });
});

exports.UpdateCart = Asyncwrapper(async (req, res, next) => {
  const Update = await CartModel.findById(req.params.Id);
  Update.quantity = Update.quantity + req.body.quantity;
  const UpdatedCart = await CartModel.findByIdAndUpdate(
    req.params.Id,
    { quantity: Update.quantity },
    { new: true, runValidators: true }
  );
  if (!UpdatedCart) {
    return next(new AppError("Not Found :(", 404));
  }
  res.status(201).json({
    Status: "Success",
    UpdatedCart
  });
});
