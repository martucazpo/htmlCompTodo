import "./redux.js";
import { ADD_TODO, CHANGE_EDIT, DELETE_TODO, EDIT_TODO } from "./types.js";

let initialState = {
  id: "",
  task: "",
  tasks: [],
  isEdit: false,
  editId: ""
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
      case DELETE_TODO:
        let allTheOthers = state.tasks.filter(task => task.id !== action.payload)
        return {
          ...state,
          tasks: allTheOthers
        }
      case CHANGE_EDIT:
        return {
          ...state,
          isEdit: !state.isEdit,
          editId: action.payload
        }
    default:
      return state;
  }
};

const store = Redux.createStore(reducer);


export default store;
