const Express = require("express");
const App = require("./App");
const BookRoute = require("./Routes/BookRoute");
const CartRoute = require("./Routes/CartRoute");
const AppError = require("./Utils/AppError");
const ErrorMiddleWare = require("./Utils/ErrorMiddleWare.js");
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

// Routes
App.use("/book", BookRoute);
App.use("/cart", CartRoute);

// Path Not Found Middleware
App.all("*", (req, res, next) => {
  return next(new AppError(`Can Not Find ${req.originalUrl} From Server`, 404));
});

// Error Middleware
App.use(ErrorMiddleWare);

// Listening At PORT
const Server = App.listen(5000, () => {
  console.log("Server Is Running On Port ", 5000);
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
