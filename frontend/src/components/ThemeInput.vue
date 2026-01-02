<template>
  <div class="theme-input-container">
    <h2>Generate Your Adventure</h2>
    <p>Enter a theme for your interactive story</p>

    <form @submit.prevent="handleSubmit">
      <div class="input-group">
        <input
          type="text"
          v-model="theme"
          placeholder="Enter a theme (e.g. pirates, space, medieval...)"
          :class="{ error: error }"
        />
        <p v-if="error" class="error-text">{{ error }}</p>
      </div>
      <button type="submit" class="generate-btn">
        Generate Story
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const theme = ref('')
const error = ref('')

const emit = defineEmits(['submit'])

const handleSubmit = () => {
  if (!theme.value.trim()) {
    error.value = 'Please enter a theme name'
    return
  }

  emit('submit', theme.value)
}
</script>