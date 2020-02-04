const Express = require("express");
const Mongoose = require("mongoose");

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

module.exports = App;
