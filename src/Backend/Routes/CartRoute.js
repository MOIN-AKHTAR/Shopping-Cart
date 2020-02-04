const Express = require("express");
const CartController = require("../Controller/CartController");
const Route = Express.Router();

Route.route("/")
  .post(CartController.CreateCart)
  .get(CartController.GetCart);
Route.route("/:Id")
  .delete(CartController.DeleteCart)
  .patch(CartController.UpdateCart);

module.exports = Route;
