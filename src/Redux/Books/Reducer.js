import { ADD_BOOK, REMOVE_BOOK, UPDATE_BOOK, GET_BOOKS } from "./Types";
export const bookReducer = (State = [], Action) => {
  switch (Action.type) {
    case ADD_BOOK: {
      const BookAdded = [...State, Action.Payload];
      return BookAdded;
    }
    case REMOVE_BOOK: {
      const Index = State.findIndex(Item => Item._id === Action.Payload);
      return [
        ...State.slice(0, Index),
        ...State.slice(Index + 1, State.length)
      ];
    }
    case UPDATE_BOOK: {
      const NewArr = [...State];
      const Index = NewArr.findIndex(Item => Item._id === Action.Payload.id);
      const UpdatedObj = {
        ...NewArr[Index],
        title: Action.Payload.title,
        price: Action.Payload.price,
        description: Action.Payload.description
      };
      return [
        ...NewArr.slice(0, Index),
        ...NewArr.slice(Index + 1, NewArr.length),
        UpdatedObj
      ];
    }
    case GET_BOOKS: {
      return [...Action.Payload];
    }
    default:
      return State;
  }
};
