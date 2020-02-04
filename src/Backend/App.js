const Express = require("express");
const Mongoose = require("mongoose");
const BookModel = require("./Models/Book");
const CartModel = require("./Models/Cart");
const AppError = require("./Utils/AppError");
const Asyncwrapper = require("./Utils/AsyncWrapper");
const ErrorMiddleWare = require("./Utils/ErrorMiddleWare.js");
const Dotenv = require("dotenv");

Dotenv.config({
  path: "../../config.env"
});
// Handling Unhandled Exceptions
process.on("uncaughtException", err => {
  console.log("UNHADLED EXCEPTION ...");
  console.log(err.name, err.message);
  console.log(err.stack);
  process.exit(1);
  // 0 stand for Success
  // 1 stands for Reject
});

// Making Our App As Express
const App = Express();

// Making Connection
Mongoose.connect(
  process.env.DB,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  err => {
    if (err) {
      return console.log("Unable To Connect To Mongodb");
    }
    console.log("Connected To Mongodb Successfully!!!");
  }
);

// Resolving CORS Error
App.use((req, res, next) => {
  // Website you wish to allow to connect
  res.header("Access-Control-Allow-Origin", "*");
  // Request headers you wish to allow
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,content-type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    // Request methods you wish to allow
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    return res.status(200).json({});
  }
  next();
});

// It Will Allow us To Read req.body
App.use(Express.json());

App.post(
  "/book",
  Asyncwrapper(async (req, res, next) => {
    const Book = await BookModel.create(req.body);
    if (!Book) {
      return next(new AppError("Unable To Create Book", 500));
    }
    res.status(201).json({
      Status: "Success",
      Book
    });
  })
);

App.get(
  "/book",
  Asyncwrapper(async (req, res, next) => {
    const Book = await BookModel.find({});
    res.status(200).json({
      Status: "Success",
      Count: Book.length,
      Book
    });
  })
);

App.delete(
  "/book/:Id",
  Asyncwrapper(async (req, res, next) => {
    const Id = req.params.Id;
    const DeletedBook = await BookModel.findByIdAndDelete(Id);
    if (!DeletedBook) {
      return next(new AppError("This Item Not Found :(", 404));
    }
  })
);

App.post(
  "/cart",
  Asyncwrapper(async (req, res, next) => {
    const Cart = new CartModel(req.body);
    await Cart.save();
    if (!Cart) {
      return next(new AppError("Server Is Not Responding", 500));
    }
    res.status(201).json({
      Status: "Success",
      Cart
    });
  })
);

App.delete(
  "/cart/:Id",
  Asyncwrapper(async (req, res, next) => {
    const DeletedCart = await CartModel.findByIdAndDelete(req.params.Id);
    if (!DeletedCart) {
      return next(new AppError("Not Found :(", 404));
    }
    res.status(201).json({
      Status: "Success",
      DeletedCart
    });
  })
);

App.get(
  "/cart",
  Asyncwrapper(async (req, res, next) => {
    const Carts = await CartModel.find({});
    res.status(200).send({
      Status: "Success",
      Carts
    });
  })
);

App.patch(
  "/cart/:Id",
  Asyncwrapper(async (req, res, next) => {
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
  })
);

App.all("*", (req, res, next) => {
  return next(new AppError(`Can Not Find ${req.originalUrl} From Server`, 404));
});

// Error Middleware
App.use(ErrorMiddleWare);

// Listening At PORT
const Server = App.listen(process.env.PORT, () => {
  console.log("Server Is Running On Port ", process.env.PORT);
});

// Handling Unhandled Rejections
process.on("unhandledRejection", err => {
  console.log("UNHANDLED REJECTION ...");
  console.log("Shutting Down Server....");
  console.log(err.name, err.message);
  console.log(err.stack);
  Server.close(() => {
    process.exit(1);
    // 0 stand for Success
    // 1 stands for Reject
  });
});
