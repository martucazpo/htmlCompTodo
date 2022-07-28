import store from "../redux/store.js";
import { deleteTodo, changeEdit } from "../redux/actions.js"

let state = store.getState()
let taskEdit = document.createElement("task-form")
taskEdit.setAttribute("data", "editForm")
const template = document.createElement("template");

template.innerHTML = `<style>
*{
    margin: 0;
    padding: 0;
    box-sizing:border-box;
}
ul{
    list-style: none;
    padding: 0.5em;
    width:100%;
    display: flex;
    flex-direction: column;
}
li{
    padding: 0.25em;
    margin-top: 0.25em;
    display:flex;
}
li h3 {
  font-weight: normal;
}
li button {
  padding: 0.25em;
  border: none;
  outline: none;
  margin-left: 4px;
  cursor:pointer;
}
.delete-btn {
  background-color: coral;
  border-radius: 50%;
}
.delete-btn:hover {
  background-color:red;
  color: white;
}
.edit-btn{
  background-color: goldenrod;
}
.edit-btn:hover{
  background-color:gold;
}
@media only screen and (min-width: 400px){
    ul {
        width: 50%;
    }
}
</style>
<ul id="taskUl">
</ul>
`;

console.log(template);
class RenderTasks extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.state = state
    this.store = store
    this.unsubscribe = this.unsubscribe.bind(this)
    this.doRender = this.doRender.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
    this.doRender()
    this.unsubscribe()
  }
  getState(path){  
    return this.store.getState()[path]
  }
  setState(value,path){
    if(this.state[path] !== value){
        this.state[path] = value
        this.doRender()
    } 
  }
  unsubscribe(){
    this.store.subscribe(()=>this.setState(this.getState("tasks"), "tasks"))
    this.store.subscribe(()=>this.setState(this.getState("editId"), "editId"))
    this.store.subscribe(()=>this.setState(this.getState("isEdit"), "isEdit"))
  }
  toggleEdit(id){
  store.dispatch(changeEdit(id))
  this.doRender()
  }
  doRender(){
    let tasks = this.state.tasks
    this.shadowRoot.innerHTML = ""
    tasks.length <= 0 ? this.shadowRoot.innerHTML = "<h2>There is nothing here to do!</h2>" :
    this.shadowRoot.append(template.content.cloneNode(true));
    let ul = this.shadowRoot.querySelector("#taskUl")
    tasks.forEach(task => {
      if(this.state.isEdit && task.id === this.state.editId){
        ul.append(taskEdit)
      } else {
        let li = document.createElement("li")
        let h3 = document.createElement("h3")
        h3.innerText = task.task
        li.append(h3)
        let deleteBtn = document.createElement("button")
        deleteBtn.innerText = "X"
        deleteBtn.classList = "delete-btn"
        deleteBtn.addEventListener("click",()=>store.dispatch(deleteTodo(task.id)))
        let editBtn = document.createElement("button")
        editBtn.innerText = "EDIT"
        editBtn.classList = "edit-btn"
        editBtn.addEventListener("click", ()=>this.toggleEdit(task.id))
        li.append(deleteBtn)
        li.append(editBtn)
        ul.append(li)
      } 
    })
  }
}
window.customElements.define("render-tasks", RenderTasks);
