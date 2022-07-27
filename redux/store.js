import "./redux.js";
import { ADD_TODO, EDIT_TODO, GET_TODOS } from "./types.js";

let initialState = {
  id: "",
  task: "",
  tasks: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        task: "",
        tasks: [action.payload, ...state.tasks],
      };
    case EDIT_TODO:
      let youveChanged = state.tasks.map((item) => {
        if (item.id === action.payload.id) {
          item.task = action.payload.task;
        }
        return item;
      });
      return {
        ...state,
        tasks: youveChanged,
      };
    case GET_TODOS:
      return state;
    default:
      return state;
  }
};

const store = Redux.createStore(reducer);


export default store;
