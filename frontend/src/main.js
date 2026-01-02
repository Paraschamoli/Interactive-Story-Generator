import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './index.css'
import './App.css'
import App from './App.vue'

// Import components
import StoryGenerator from './components/StoryGenerator.vue'
import StoryLoader from './components/StoryLoader.vue'

// Create router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/story/:id', component: StoryLoader },
    { path: '/', component: StoryGenerator }
  ]
})

// Create and mount app
const app = createApp(App)
app.use(router)
app.mount('#app')