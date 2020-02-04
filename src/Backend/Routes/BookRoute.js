const Express = require("express");
const BookController = require("../Controller/BookController");
const Route = Express.Router();

Route.route("/")
  .post(BookController.PostBook)
  .get(BookController.GetBooks);
Route.route("/:Id").delete(BookController.DeleteBook);

module.exports = Route;
