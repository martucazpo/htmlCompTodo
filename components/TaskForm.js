import store from "../redux/store.js";
import { addTodo, editTodo } from "../redux/actions.js"
//import { renderApp } from "../script.js"

const state = store.getState()

const template = document.createElement("template");
template.innerHTML = `
<style>
* {
    margin: 0;
    padding:0;
    box-sizing: border-box;
}
form {
    width: 100%;
    display: flex;
    flex-direction: column;
}
form input {
    padding: 0.25em;
}
form button {
    padding: 0.25em;
    outline: none;
    border: none;
}
@media only screen and (min-width:300px){
    form{
        width: 50%;
        flex-direction: row
    }
    form button {
        margin-left: 3px;
    }
}
</style>
<form>
<input name="task" id="taskInput" required />
<button type="submit" id="formButton" ></button>
</form>
`;

class TaskForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.append(template.content.cloneNode(true));
    if (this.getAttribute("data") === "addForm") {
      this.shadowRoot.querySelector("#formButton").style =
        "background-color: green; color: white;";
      this.shadowRoot.querySelector("#formButton").innerText = "ADD";
    } else {
      this.shadowRoot.querySelector("#formButton").style =
        "background-color: orchid; color: white;";
      this.shadowRoot.querySelector("#formButton").innerText = "EDIT";
    }
  }
  handleSubmit(e, task) {
    e.preventDefault();
    let todo = {}
    todo.task = task.task
    this.shadowRoot.querySelector("#taskInput").value = "";
    store.dispatch(addTodo(todo))
    state.id = "";
    state.task = "";
    //renderApp()
  }
  handleEdit(e, task) {
    e.preventDefault()
    state.editId = ""
    state.isEdit = false
    store.dispatch(editTodo(task))
  }
  handleInput(e) {
    let { name, value } = e.target;
    state[name] = value;
  }
  connectedCallback() {
    this.shadowRoot
      .querySelector("#taskInput")
      .addEventListener("input", this.handleInput);
    if (this.getAttribute("data") === "addForm") {
      this.shadowRoot
        .querySelector("form")
        .addEventListener("submit", (e) => this.handleSubmit(e, state));
    } else if (this.getAttribute("data") === "editForm") {
      this.shadowRoot
        .querySelector("form")
        .addEventListener("submit", (e) => this.handleEdit(e,state));
    }
  }
  disconnectedCallback() {
    this.shadowRoot
      .querySelector("#taskInput")
      .removeEventListener("input", this.handleInput);
    if (this.getAttribute("data") === "addForm") {
      this.shadowRoot
        .querySelector("form")
        .removeEventListener("submit", this.handleSubmit);
    } else if (this.getAttribute("data") === "editForm") {
      this.shadowRoot
        .querySelector("form")
        .removeEventListener("submit", this.handleEdit);
    }
  }
}

window.customElements.define("task-form", TaskForm);
