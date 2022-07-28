import { ADD_TODO, CHANGE_EDIT, DELETE_TODO, EDIT_TODO } from "./types.js";
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

export const deleteTodo = (id) =>{
    return {
        type: DELETE_TODO,
        payload: id
    }
}

export const changeEdit = (id) => {
    return {
        type: CHANGE_EDIT,
        payload: id
    }
}
