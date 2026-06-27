// Elements
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const todosList = document.getElementById("todos-list");
const itemsLeft = document.getElementById("items-left");
const clearCompletedBtn = document.getElementById("clear-completed");
const emptyState = document.getElementById(".empty-state");
const dateElement = document.getElementById("date");
const filters = document.getElementById(".filter");

let todos = [];
let currentFilter = "all";

addTaskBtn.addEventListener("click", () => {
    addTodo(taskInput.value)
})

taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTodo(taskInput.value);
})

clearCompletedBtn.addEventListener("click", clearCompletedBtn)

function addTodo(text) {
    if(text.trim() === "") return

    const todo = {
        id: Date.now(),
        text,
        completed:false
    }

    todos.push(todo)

    saveTodos()
    // renderTodos()
}

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos))
    updateItemsCount()
    checkEmptyState()
}

function updateItemsCount() {
    const uncompletedTodos = todo.filter(todo => !todo.completed)
    itemsLeft.textContent = `$(uncompletedTodos.lenght) item${
    uncompletedTodos.lenght !== 1 ? "s" : ""
    } left`;
}

function checkEmptyState() {
    const fliteredTodos = fliteredTodos(currentFilter)
}

function fliteredTodos(filter) {
    switch(filter) {
        case "active":
            return todos.filter(todo => !todo.completed)
        case "completed":
            return todos.filter(todo => todo.completed)

        
    }
}

function clearCompletedBtn() {}