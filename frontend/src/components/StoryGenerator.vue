<template>
  <div class="story-generator">
    <div v-if="error" class="error-message">
      <p>{{ error }}</p>
      <button @click="reset">Try Again</button>
    </div>

    <ThemeInput v-if="!jobId && !error && !loading" @submit="generateStory" />
    <LoadingStatus v-if="loading" :theme="theme" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import ThemeInput from './ThemeInput.vue'
import LoadingStatus from './LoadingStatus.vue'
import { API_BASE_URL } from '../util'

const router = useRouter()

const theme = ref('')
const jobId = ref(null)
const jobStatus = ref(null)
const error = ref(null)
const loading = ref(false)

let pollInterval = null

watch([jobId, jobStatus], ([newJobId, newJobStatus]) => {
  if (newJobId && newJobStatus === 'processing') {
    pollInterval = setInterval(() => {
      pollJobStatus(newJobId)
    }, 5000)
  } else if (pollInterval) {
    clearInterval(pollInterval)
    pollInterval = null
  }
})

const generateStory = async (storyTheme) => {
  loading.value = true
  error.value = null
  theme.value = storyTheme

  try {
    const response = await axios.post(`${API_BASE_URL}/stories/create`, { theme: storyTheme })
    const { job_id, status } = response.data
    jobId.value = job_id
    jobStatus.value = status

    await pollJobStatus(job_id)
  } catch (e) {
    loading.value = false
    error.value = `Failed to generate story: ${e.message}`
  }
}

const pollJobStatus = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/jobs/${id}`)
    const { status, story_id, error: jobError } = response.data
    jobStatus.value = status

    if (status === 'completed' && story_id) {
      await fetchStory(story_id)
    } else if (status === 'failed' || jobError) {
      error.value = jobError || 'Failed to generate story'
      loading.value = false
    }
  } catch (e) {
    if (e.response?.status !== 404) {
      error.value = `Failed to check story status: ${e.message}`
      loading.value = false
    }
  }
}

const fetchStory = async (id) => {
  try {
    loading.value = false
    jobStatus.value = 'completed'
    router.push(`/story/${id}`)
  } catch (e) {
    error.value = `Failed to load story: ${e.message}`
    loading.value = false
  }
}

const reset = () => {
  jobId.value = null
  jobStatus.value = null
  error.value = null
  theme.value = ''
  loading.value = false
}
</script>