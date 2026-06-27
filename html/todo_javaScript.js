// ======================
// ELEMENTS
// ======================

const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const todosList = document.getElementById("todos-list");
const itemsLeft = document.getElementById("items-left");
const clearCompletedBtn = document.getElementById("clear-completed");
const emptyState = document.querySelector(".empty-state");
const dateElement = document.getElementById("date");
const filters = document.querySelectorAll(".filter");


// ======================
// DATA
// ======================

let todos = [];
let currentFilter = "all";


// ======================
// DATE
// ======================

const today = new Date();

dateElement.textContent =
today.toLocaleDateString(
"en-US", {
    weekday:"long",
    year:"numeric",
    month:"long",
    day:"numeric"
}
);


// ======================
// EVENTS
// ======================

addTaskBtn.addEventListener(
    "click", () => {
        addTodo(taskInput.value);
    }
);

taskInput.addEventListener(
    "keydown", (e)=>{
        if(e.key==="Enter"){
            addTodo(taskInput.value);
        }
    }
);

clearCompletedBtn.addEventListener(
    "click", clearCompleted
);


// FILTERS

filters.forEach(filter=>{

filter.addEventListener(
"click",
()=>{

filters.forEach(f=>
f.classList.remove("active")
);

filter.classList.add("active");

currentFilter =
filter.dataset.filter;

renderTodos();

}
);

});


// ======================
// ADD TODO
// ======================

function addTodo(text){

if(text.trim()==="")
return;

const todo={

id:Date.now(),

text:text,

completed:false

};

todos.push(todo);

taskInput.value="";

saveTodos();

renderTodos();

}


// ======================
// SAVE
// ======================

function saveTodos(){

localStorage.setItem(
"todos",
JSON.stringify(todos)
);

updateItemsCount();

checkEmptyState();

}


// ======================
// LOAD
// ======================

function loadTodos(){

const saved =
localStorage.getItem(
"todos"
);

if(saved){

todos =
JSON.parse(saved);

}

renderTodos();

}


// ======================
// COUNT
// ======================

function updateItemsCount(){

const uncompletedTodos =

todos.filter(
todo =>
!todo.completed
);

itemsLeft.textContent =

`${uncompletedTodos.length}
item${
uncompletedTodos.length!==1
?
"s"
:
""
}
left`;

}


// ======================
// EMPTY
// ======================

function checkEmptyState(){

const filtered =
filterTodos(
currentFilter
);

if(filtered.length===0){

emptyState
.classList
.remove(
"hidden"
);

}

else{

emptyState
.classList
.add(
"hidden"
);

}

}


// ======================
// FILTER
// ======================

function filterTodos(filter){

switch(filter){

case "active":

return todos.filter(
todo=>
!todo.completed
);

case "completed":

return todos.filter(
todo=>
todo.completed
);

default:

return todos;

}

}


// ======================
// RENDER
// ======================

function renderTodos(){

todosList.innerHTML="";

const filteredTodos =
filterTodos(
currentFilter
);

filteredTodos.forEach(

todo=>{

const todoItem =
document.createElement(
"li"
);

todoItem.classList.add(
"todo-item"
);

if(todo.completed){

todoItem.classList.add(
"completed"
);

}


// CHECKBOX

const checkboxContainer =
document.createElement(
"label"
);

checkboxContainer.classList.add(
"checkbox-container"
);

const checkbox =
document.createElement(
"input"
);

checkbox.type =
"checkbox";

checkbox.checked =
todo.completed;

checkbox.classList.add(
"todo-checkbox"
);

checkbox.addEventListener(
"change",
()=>toggleTodo(
todo.id
)
);

const checkmark =
document.createElement(
"span"
);

checkmark.classList.add(
"checkmark"
);

checkboxContainer.appendChild(
checkbox
);

checkboxContainer.appendChild(
checkmark
);


// TEXT

const todoText =
document.createElement(
"span"
);

todoText.classList.add(
"todo-item-text"
);

todoText.textContent =
todo.text;


// DELETE

const deleteBtn =
document.createElement(
"button"
);

deleteBtn.classList.add(
"delete-btn"
);

deleteBtn.innerHTML =
'<i class="fas fa-times"></i>';

deleteBtn.addEventListener(
"click",
()=>deleteTodo(
todo.id
)
);


// APPEND

todoItem.appendChild(
checkboxContainer
);

todoItem.appendChild(
todoText
);

todoItem.appendChild(
deleteBtn
);

todosList.appendChild(
todoItem
);

}

);

updateItemsCount();

checkEmptyState();

}


// ======================
// TOGGLE
// ======================

function toggleTodo(id){

todos =
todos.map(

todo=>

todo.id===id

?

{
...todo,

completed:
!todo.completed
}

:

todo

);

saveTodos();

renderTodos();

}


// ======================
// DELETE
// ======================

function deleteTodo(id){

todos =
todos.filter(

todo=>

todo.id!==id

);

saveTodos();

renderTodos();

}


// ======================
// CLEAR
// ======================

function clearCompleted(){

todos =
todos.filter(

todo=>

!todo.completed

);

saveTodos();

renderTodos();

}


// ======================
// START
// ======================

loadTodos();