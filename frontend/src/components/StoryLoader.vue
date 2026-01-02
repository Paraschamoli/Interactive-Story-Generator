<template>
  <div class="story-loader">
    <LoadingStatus v-if="loading" theme="story" />
    
    <div v-else-if="error" class="error-message">
      <h2>Story Not Found</h2>
      <p>{{ error }}</p>
      <button @click="createNewStory">Go to Story Generator</button>
    </div>

    <StoryGame v-else-if="story" :story="story" :on-new-story="createNewStory" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import LoadingStatus from './LoadingStatus.vue'
import StoryGame from './StoryGame.vue'
import { API_BASE_URL } from '../util'

const route = useRoute()
const router = useRouter()

const story = ref(null)
const loading = ref(true)
const error = ref(null)

const loadStory = async (storyId) => {
  loading.value = true
  error.value = null

  try {
    const response = await axios.get(`${API_BASE_URL}/stories/${storyId}/complete`)
    story.value = response.data
    loading.value = false
  } catch (err) {
    if (err.response?.status === 404) {
      error.value = 'Story is not found.'
    } else {
      error.value = 'Failed to load story'
    }
    loading.value = false
  }
}

const createNewStory = () => {
  router.push('/')
}

// Watch for route parameter changes
watch(() => route.params.id, (newId) => {
  if (newId) {
    loadStory(newId)
  }
}, { immediate: true })
</script>