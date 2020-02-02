const Redux = require("redux");
const { createStore, combineReducers } = Redux;
// Action Types
const ADD_BOOK = "ADD_BOOK";
const REMOVE_BOOK = "REMOVE_BOOK";
const UPDATE_BOOK = "UPDATE_BOOK";
const ADD_TO_CART = "ADD_TO_CART";

// Action Generators
const Add_Book = Book => ({
  type: ADD_BOOK,
  Payload: Book
});

const Remove_Book = id => ({
  type: REMOVE_BOOK,
  Payload: id
});

const Update_Book = Book => ({
  type: UPDATE_BOOK,
  Payload: Book
});

const Add_To_Cart = id => ({
  type: ADD_TO_CART,
  Payload: id
});

// REDUCER
const bookReducer = (State = [], Action) => {
  switch (Action.type) {
    case ADD_BOOK:
      return [...State, Action.Payload];
    case REMOVE_BOOK: {
      const Index = State.findIndex(Item => Item.id === Action.Payload);
      return [
        ...State.slice(0, Index),
        ...State.slice(Index + 1, State.length)
      ];
    }
    case UPDATE_BOOK: {
      const NewArr = [...State];
      const Index = NewArr.findIndex(Item => Item.id == Action.Payload.id);
      console.log(Index);
      console.log("CONSOLE", { ...NewArr[Index] });
      const UpdatedObj = {
        ...NewArr[Index],
        title: Action.Payload.title,
        description: Action.Payload.description
      };
      return [
        ...NewArr.slice(0, Index),
        ...NewArr.slice(Index + 1, NewArr.length),
        UpdatedObj
      ];
    }
    default:
      return State;
  }
};

const addToCartReducer = (State = [], Action) => {
  switch (Action.type) {
    case ADD_TO_CART:
      return [...State, Action.Payload];
    default:
      return State;
  }
};

// Creating Store
const Store = createStore(
  combineReducers({
    Books: bookReducer,
    Carts: addToCartReducer
  })
);

Store.subscribe(() => {
  console.log(Store.getState());
});
Store.dispatch(
  Add_Book({
    id: 1,
    title: "Moon And Sun",
    description: "No Description Yet"
  })
);
