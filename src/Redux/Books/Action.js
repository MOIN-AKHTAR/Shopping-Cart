import { ADD_BOOK, REMOVE_BOOK, UPDATE_BOOK, GET_BOOKS } from "./Types";
import axios from "axios";

export const Add_Book = Book => {
  return function(dispatch) {
    axios({
      method: "POST",
      url: "http://localhost:5000/book",
      data: Book
    })
      .then(response => {
        const Data = response.data.Book;
        dispatch({
          type: ADD_BOOK,
          Payload: Data
        });
      })
      .catch(err => console.log("Custom Error", err.message));
  };
};

export const Get_Books = () => {
  return function(dispatch) {
    axios({
      method: "GET",
      url: `http://localhost:5000/book`
    })
      .then(response => {
        const Data = response.data.Book;
        dispatch({
          type: GET_BOOKS,
          Payload: Data
        });
      })
      .catch(err => console.log("Custom Error", err.message));
  };
};

export const Remove_Book = Id => {
  return function(dispatch) {
    axios({
      method: "DELETE",
      url: `http://localhost:5000/book/${Id}`
    })
      .then(response => {
        dispatch({
          type: REMOVE_BOOK,
          Payload: Id
        });
      })
      .catch(err => console.log("Custom Error", err.message));
  };
}

export const Update_Book = Book => ({
  type: UPDATE_BOOK,
  Payload: Book
});
