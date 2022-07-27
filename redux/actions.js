import { ADD_TODO, EDIT_TODO, GET_TODOS } from "./types.js";
import { uuidv4 } from "../js/uuidv4.js";

export const addTodo = (todo) =>{
    todo.id = uuidv4()
    return {
        type: ADD_TODO,
        payload: todo
    }
}

export const editTodo = (id) =>{
    return {
        type: EDIT_TODO,
        payload: id
    }
}

export const getTodos = () =>{
    return {
        type: GET_TODOS
    }
}
