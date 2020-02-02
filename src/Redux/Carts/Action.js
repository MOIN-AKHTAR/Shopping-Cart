import { ADD_TO_CART, DELETE_CART, UPDATE_CART } from "./Type";

export const Add_To_Cart = Item => ({
  type: ADD_TO_CART,
  Payload: Item
});

export const Delete_Cart = Id => ({
  type: DELETE_CART,
  Payload: Id
});

export const Update_To_Cart = (id, unit) => {
  return {
    type: UPDATE_CART,
    id,
    unit
  };
};
