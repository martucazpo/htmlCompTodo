import store from "./redux/store.js"
const root = document.getElementById("root")

const taskForm = document.createElement("task-form")
taskForm.setAttribute("data", "addForm")
const renderTasks = document.createElement("render-tasks")


export const renderApp =()=>{
    root.innerHTML = ""
    root.append(taskForm)
    root.append(renderTasks)
}

renderApp()



