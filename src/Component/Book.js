import React, { Component } from "react";
import { Jumbotron, Button } from "react-bootstrap";
import { Add_To_Cart, Update_To_Cart } from "../Redux/Carts/Action";
import { connect } from "react-redux";
class Book extends Component {
  handleCart() {
    const Obj = {
      ...this.props.Item,
      quantity: 1
    };
    // CART IS NOT EMPTY
    if (this.props.Cart.length > 0) {
      let findIndex = this.props.Cart.findIndex(
        Item => Item._id === this.props.Item._id
      );

      if (findIndex === -1) {
        // IF ITEM NOT ADDED TO CART
        this.props.AddToCart(Obj);
      } else {
        // IF ITEM  ADDED TO CART
        this.props.UpdateToCart(this.props.Item._id, 1);
      }
    } else {
      // CART IS EMPTY
      this.props.AddToCart(Obj);
    }
  }
  render() {
    return (
      <Jumbotron>
        <h6>{this.props.Item.title}</h6>
        <hr />
        <p>{this.props.Item.description}</p>
        <h6>usd .{this.props.Item.price}</h6>
        <Button variant="primary" onClick={this.handleCart.bind(this)}>
          Buy Now
        </Button>
      </Jumbotron>
    );
  }
}

const mapStateToProps = State => {
  return {
    Cart: State.Carts.Cart
  };
};

const mapDispatchToProps = Dispatch => {
  return {
    AddToCart: Book => Dispatch(Add_To_Cart(Book)),
    UpdateToCart: (id, unit) => Dispatch(Update_To_Cart(id, unit))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Book);
