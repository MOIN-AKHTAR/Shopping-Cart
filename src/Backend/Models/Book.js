const Mongoose = require("mongoose");
const bookSchema = Mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please Provide Book Title"],
    trim: true
  },
  description: {
    type: String,
    default: "No Description Yet",
    trim: true
  },
  price: {
    type: Number,
    required: [true, "Please Provide Price"],
    validate: function(Value) {
      if (Value <= 0) throw new Error("Shouldn't Be Negative Or Zero");
    }
  },
  quantity: {
    type: Number
  }
});

bookSchema.methods.toJSON = function() {
  const Book = this;
  const PureObject = Book.toObject();
  delete PureObject.__v;
  return PureObject;
};

const BookModel = Mongoose.model("Books", bookSchema);
module.exports = BookModel;
