<template>
  <link rel="stylesheet" 
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" 
    integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==" 
    crossorigin="anonymous" referrerpolicy="no-referrer" />
  <div class="app">
    <header>
      <h1>
        <i class="fas fa-check-circle"></i>
        {{ t.my_tasks }}
      </h1>
      <p>{{ today }}</p>
    </header>

    <!-- INPUT -->
    <div class="todo-input">
      <input
        id="task-input"
        v-model="task"
        :placeholder="t.What_do_you_need"
        @keyup.enter="addTodo"
      />

      <button id="add-task" @click="addTodo">
        <i class="fas fa-plus"></i>
      </button>
    </div>

    <!-- FILTERS -->
    <div class="filters">
      <span
        class="filter"
        :class="{ active: currentFilter === 'all' }"
        data-filter="all"
        @click="currentFilter = 'all'"
      >
        {{ t.all_1 }}
      </span>

      <span
        class="filter"
        :class="{ active: currentFilter === 'active' }"
        data-filter="active"
        @click="currentFilter = 'active'"
      >
        {{ t.active_1 }}
      </span>

      <span
        class="filter"
        :class="{ active: currentFilter === 'completed' }"
        data-filter="completed"
        @click="currentFilter = 'completed'"
      >
        {{ t.complete_1 }}
      </span>
    </div>

    <!-- LIST -->
    <div class="todos-container">
      <ul id="todos-list">
        <li
          v-for="todo in filteredTodos"
          :key="todo.id"
          class="todo-item"
          :class="{ completed: todo.completed }"
        >
          <label class="checkbox-container">
            <input
              type="checkbox"
              class="todo-checkbox"
              v-model="todo.completed"
            />
            <span class="checkmark"></span>
          </label>

          <span class="todo-item-text">
            {{ todo.text }}
          </span>

          <button class="delete-btn" @click="remove(todo.id)">
            <i class="fas fa-times"></i>
          </button>
        </li>
      </ul>

      <div class="empty-state" v-if="filteredTodos.length === 0">
        <i class="fas fa-clipboard-list"></i>
        <p>{{ t.tasks_here_yet }}</p>
      </div>
    </div>

    <!-- FOOTER -->
    <footer>
      <p id="items-left">
        {{ remaining }} {{ t.items_left }}
      </p>

      <button id="clear-completed" @click="clearCompleted">
        {{ t.clear_completed }}
      </button>
    </footer>

    <!-- LANG -->
    <div class="btn_languages">
      <button class="btn_lang_rus" @click="setLang('ru')">
        {{ t.Russia_1 }}
      </button>

      <button class="btn_lang_eng" @click="setLang('en')">
        {{ t.English_1 }}
      </button>

      <button class="btn_lang_est" @click="setLang('et')">
        {{ t.Estonian_1 }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"

/* ================= STATE ================= */
const task = ref("")
const todos = ref([])
const currentFilter = ref("all")
const lang = ref("en")

/* ================= DATE ================= */
const today = new Date().toLocaleDateString()

/* ================= TRANSLATIONS ================= */
const translations = {
  en: {
    my_tasks: "My tasks",
    all_1: "All",
    active_1: "Active",
    complete_1: "Completed",
    tasks_here_yet: "No tasks here yet",
    items_left: "items left",
    clear_completed: "Clear completed",
    Russia_1: "Russia",
    English_1: "English",
    Estonian_1: "Estonian",
    What_do_you_need: "What do you need to do?"
  },

  ru: {
    my_tasks: "Мои задачи",
    all_1: "Все",
    active_1: "Активные",
    complete_1: "Выполненные",
    tasks_here_yet: "Задач пока нет",
    items_left: "задач осталось",
    clear_completed: "Очистить выполненные",
    Russia_1: "Русский",
    English_1: "Английский",
    Estonian_1: "Эстонский",
    What_do_you_need: "Что нужно сделать?"
  },

  et: {
    my_tasks: "Minu ülesanded",
    all_1: "Kõik",
    active_1: "Aktiivsed",
    complete_1: "Tehtud",
    tasks_here_yet: "Ülesandeid pole",
    items_left: "ülesannet alles",
    clear_completed: "Kustuta tehtud",
    Russia_1: "Vene",
    English_1: "Inglise",
    Estonian_1: "Eesti",
    What_do_you_need: "Mida sa pead tegema?"
  }
}

/* ================= CURRENT LANG ================= */
const t = computed(() => translations[lang.value])

function setLang(l) {
  lang.value = l
}

/* ================= FILTER ================= */
const filteredTodos = computed(() => {
  if (currentFilter.value === "active") {
    return todos.value.filter(t => !t.completed)
  }

  if (currentFilter.value === "completed") {
    return todos.value.filter(t => t.completed)
  }

  return todos.value
})

const remaining = computed(() =>
  todos.value.filter(t => !t.completed).length
)

/* ================= LOGIC ================= */
function addTodo() {
  if (!task.value.trim()) return

  todos.value.push({
    id: Date.now(),
    text: task.value,
    completed: false
  })

  task.value = ""
}

function remove(id) {
  todos.value = todos.value.filter(t => t.id !== id)
}

function clearCompleted() {
  todos.value = todos.value.filter(t => !t.completed)
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary: #7749f8;
    --primary-light: #9775fa;
    --dark: #212529;
    --light: #f8f9fa;
    --gray: #868e96;
    --danger: #fa5252;
    --success: #40c057;
    --border: #e9ecef;
}

body {
    font-family: sans-serif;
    background-color: #f1f3f5;
    min-width: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    color: var(--dark);
}

.app {
    width: 100%;
    max-width: 500px;
    background-color: #fff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.01);
}

header {
    background-color: var(--primary);
    color: white;
    padding: 20px 25px;
}

header h1 {
    font-size: 24px;
    margin-bottom: 5px;
    font-weight: 600;
}

header p {
    font-size: 14px;
    opacity: 0.9;
}

.todo-input {
    padding: 20px 25px;
    display: flex;
    gap: 10px;
    background-color: var(--light);
    border-bottom: 1px solid var(--border);
}

.todo-input input {
    flex: 1;
    padding: 12px 15px;
    border: 1px solid #dee2e6;
    font-size: 1rem;
    transition: all 0.2s;
    border-radius: 6px;
}

.todo-input input:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow:  0 0 0 3px rgba(119, 73, 248, 0.15);
}

.todo-input button {
    background-color: var(--primary);
    color: white;
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
}

.todo-input button:hover {
    background-color: var(--primary-light);
}

.filters {
    display: flex;
    gap: 15px;
    border-bottom: 1px solid var(--border);
    padding: 15px 25px;
}

.filter {
    padding: 5px 3px;
    cursor: pointer;
    color: var(--gray);
    border-bottom: 2px solid transparent;
    transition: all 0.2s;
}

filter:hover {
    color: var(--primary);
}

.filter.active {
    color: var(--primary);
    border-bottom: 2px solid var(--primary);
    font-weight: 500;
}

.todos-container {
    padding: 15px 0;
    max-height: 300px;
    overflow-y: auto;
}

#todos-list {
    list-style-type: none;
}

.todo-item {
    padding: 12px 15px;
    display: flex;
    align-items: center;
    transition: background-color 0.2s;
}

.todo-item:hover {
    background-color: var(--light);
}

.checkbox-container {
    margin-left: 15px;
}

.todo-checkbox {
    opacity: 0;
    position: absolute;
}

.checkmark {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid #dee2e6;
    border-radius: 4px;
    position: relative;
    cursor: pointer;
    transition: all 0.2s;
}

.todo-checkbox:checked + .checkmark {
    background-color: var(--success);
    border-color: var(--success);
}

.todo-checkbox:checked + .checkmark::after {
    content: "";
    position: absolute;
    left: 6px;
    top: 2px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
}

.todo-item-text {
    flex: 1;
    font-size: 1rem;
    transition: all 0.2s;
}

.todo-item.completed .todo-item-text {
    text-decoration: line-through;
    color: var(--gray);
}

.delete-btn {
    background: none;
    border: none;
    color: var(--gray);
    cursor: pointer;
    font-size: 16px;
    opacity: 0;
    transition: all 0.2s;
}

.todo-item:hover .delete-btn {
    opacity: 1;
}

.delete-btn:hover {
    color: var(--danger);
}

.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 0;
    color: var(--gray);
}

.empty-state i {
    font-size: 40px;
    margin-bottom: 10px;
    opacity: 0.7;
}

.hidden {
    display: none;
}

footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 25px;
    border-top: 1px solid var(--border);
    background-color: var(--light);
    font-size: 14px;
}

#items-left {
    color: var(--gray);
}

#clear-completed {
    background: none;
    border: none;
    color: var(--gray);
    cursor: pointer;
    transition: all 0.2s;
}

#clear-completed:hover {
    color: var(--danger);
}


.btn_languages {
    margin-left: 10px;
    margin-bottom: 10px;
}

.btn_lang_rus , .btn_lang_eng , .btn_lang_est {
    width: 80px;
    height: 25px;
    background-color: var(--primary);
    border: 1px solid var(--primary);
    border-radius: 4px;
    color: #f1f3f5;
    margin-left: 10px;
}

.btn_lang_rus:hover , .btn_lang_eng:hover , 
.btn_lang_est:hover {
    background-color: var(--primary-light);  
    transition: all 0.2s; 
}
</style>