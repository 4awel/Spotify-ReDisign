<!-- ParentComponent.vue -->
<template>
  <div class="parent">
    <h2>Родительский компонент</h2>
    
    <p>Текущее сообщение: {{ message }}</p>
    <p>Текущие данные: {{ dataFromChild }}</p>
    
    <ChildComponent
      :parent-message="message"
      :items="products"
      @update-parent="handleUpdate"
      @update-data="handleDataUpdate"
    />
    
    <button @click="changeMessage">Изменить сообщение для ребенка</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ChildComponent from './ChildComponent.vue'
const message = ref('Привет от родителя!')
const dataFromChild = ref('')
const products = ref([
  { name: 'Ноутбук', price: 50000 },
  { name: 'Телефон', price: 30000 },
  { name: 'Наушники', price: 5000 }
])

const handleUpdate = (newMessage) => {
  message.value = newMessage
}

const handleDataUpdate = (data) => {
  dataFromChild.value = data
}

const changeMessage = () => {
  message.value = 'Новое сообщение от родителя!'
}
</script>