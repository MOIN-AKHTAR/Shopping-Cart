import { ADD_TO_CART, DELETE_CART, UPDATE_CART } from "./Type";
const DefaultValues = {
  Cart: [],
  totalAmount: 0
};
export const addToCartReducer = (State = DefaultValues, Action) => {
  switch (Action.type) {
    case ADD_TO_CART: {
      const Cart = [...State.Cart, Action.Payload];
      return {
        Cart,
        totalAmount: total(Cart).amount,
        total: totalItems(Cart)
      };
    }
    case DELETE_CART: {
      const NewArr = [...State.Cart];
      const Index = NewArr.findIndex(Item => Item._id === Action.Payload);
      const Cart = [
        ...NewArr.slice(0, Index),
        ...NewArr.slice(Index + 1, NewArr.length)
      ];
      return {
        Cart,
        totalAmount: total(Cart).amount,
        total: totalItems(Cart)
      };
    }
    case UPDATE_CART: {
      const NewArr = [...State.Cart];
      const Index = NewArr.findIndex(Item => Item._id === Action.id);
      const UpdatedObj = {
        ...NewArr[Index],
        quantity: NewArr[Index].quantity + Action.unit
      };
      const Cart = [
        ...NewArr.slice(0, Index),
        UpdatedObj,
        ...NewArr.slice(Index + 1, NewArr.length)
      ];
      return {
        Cart,
        totalAmount: total(Cart).amount,
        total: totalItems(Cart)
      };
    }
    default:
      return State;
  }
};

export const total = Payload => {
  const Total = Payload.map(
    CartItem => CartItem.price * CartItem.quantity
  ).reduce((a, b) => a + b, 0);
  return {
    amount: Total.toFixed(2)
  };
};

export const totalItems = Payload =>
  Payload.map(Item => Item.quantity).reduce((a, b) => a + b, 0);
