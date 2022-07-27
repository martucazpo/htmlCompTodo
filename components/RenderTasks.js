import store from "../redux/store.js";

let state = store.getState()

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
  }
  doRender(){
    let tasks = this.state.tasks
    this.shadowRoot.innerHTML = ""
    this.shadowRoot.append(template.content.cloneNode(true));
    let ul = this.shadowRoot.querySelector("#taskUl")
    tasks.forEach(task => {
        let li = document.createElement("li")
        li.innerText = task.task
        ul.append(li)
    })
  }
}
window.customElements.define("render-tasks", RenderTasks);
