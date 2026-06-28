<template>
  <div class="app">
    <h1>Todo App</h1>

    <input v-model="task" @keyup.enter="addTask" placeholder="Add task" />

    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{ todo.text }}
        <button @click="removeTodo(todo.id)">x</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const task = ref('')
const todos = ref([])

function addTask() {
  if (!task.value.trim()) return

  todos.value.push({
    id: Date.now(),
    text: task.value
  })

  task.value = ''
}

function removeTodo(id) {
  todos.value = todos.value.filter(t => t.id !== id)
}
</script>

<style>
body {
  margin: 0;
  font-family: Arial;
  background: #050505;
  color: white;
}

.app {
  padding: 20px;
}
</style>