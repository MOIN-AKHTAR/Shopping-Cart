const Express = require("express");
const Mongoose = require("mongoose");
const BookModel = require("./Models/Book");
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
