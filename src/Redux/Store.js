import { createStore, combineReducers, applyMiddleware } from "redux";
import { bookReducer } from "./Books/Reducer";
import { addToCartReducer } from "./Carts/Reducer";
import Thunk from "redux-thunk";

const Store = createStore(
  combineReducers({
    Books: bookReducer,
    Carts: addToCartReducer
  }),
  applyMiddleware(Thunk)
);

export default Store;
