const BookModel = require("../Models/Book");
const AppError = require("../Utils/AppError");
const Asyncwrapper = require("../Utils/AsyncWrapper");

exports.PostBook = Asyncwrapper(async (req, res, next) => {
  const Book = await BookModel.create(req.body);
  if (!Book) {
    return next(new AppError("Unable To Create Book", 500));
  }
  res.status(201).json({
    Status: "Success",
    Book
  });
});

exports.GetBooks = Asyncwrapper(async (req, res, next) => {
  const Book = await BookModel.find({});
  res.status(200).json({
    Status: "Success",
    Count: Book.length,
    Book
  });
});

exports.DeleteBook = Asyncwrapper(async (req, res, next) => {
  const Id = req.params.Id;
  const DeletedBook = await BookModel.findByIdAndDelete(Id);
  if (!DeletedBook) {
    return next(new AppError("This Item Not Found :(", 404));
  }
});
