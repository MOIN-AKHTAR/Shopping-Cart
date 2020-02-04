import { ADD_TO_CART, DELETE_CART, UPDATE_CART } from "./Type";
import axios from "axios";

export const Add_To_Cart = Item => {
  return dispatch => {
    axios({
      method: "POST",
      url: "http://localhost:5000/cart",
      data: Item
    })
      .then(AddedToCart => {
        const Data = AddedToCart.data;
        dispatch({
          type: ADD_TO_CART,
          Payload: Data.Cart
        });
      })
      .catch(err => console.log(err.message));
  };
};

export const Delete_Cart = Id => {
  return dispatch => {
    axios({
      method: "DELETE",
      url: `http://localhost:5000/cart/${Id}`
    })
      .then(Res => {
        dispatch({
          type: DELETE_CART,
          Payload: Id
        });
      })
      .catch(err => console.log(err.message));
  };
};

export const Update_To_Cart = (id, unit) => {
  return dispatch => {
    axios({
      method: "PATCH",
      url: `http://localhost:5000/cart/${id}`,
      data: {
        quantity: unit
      }
    })
      .then(res => {
        dispatch({
          type: UPDATE_CART,
          id,
          unit
        });
      })
      .catch(err => console.log(err.message));
  };
};
