<template>
  <div class="story-game">
    <header class="story-header">
      <h2>{{ story.title }}</h2>
    </header>

    <div class="story-content">
      <div v-if="currentNode" class="story-node">
        <p>{{ currentNode.content }}</p>

        <div v-if="isEnding" class="story-ending">
          <h3>{{ isWinningEnding ? "Congratulations" : "The End" }}</h3>
          <p class="ending-message">
            {{ isWinningEnding ? "You reached a winning ending" : "Your adventure has ended." }}
          </p>
        </div>
        
        <div v-else class="story-options">
          <h3>What will you do?</h3>
          <div class="options-list">
            <button
              v-for="(option, index) in options"
              :key="index"
              @click="chooseOption(option.node_id)"
              class="option-btn"
            >
              {{ option.text }}
            </button>
          </div>
        </div>
      </div>

      <div class="story-controls">
        <button @click="restartStory" class="reset-btn">
          Restart Story
        </button>
      </div>

      <button v-if="onNewStory" @click="onNewStory" class="new-story-btn">
        New Story
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  story: Object,
  onNewStory: Function
})

const currentNodeId = ref(null)
const currentNode = ref(null)
const options = ref([])
const isEnding = ref(false)
const isWinningEnding = ref(false)

watch(() => props.story, (newStory) => {
  if (newStory?.root_node) {
    currentNodeId.value = newStory.root_node.id
  }
}, { immediate: true })

watch(() => currentNodeId.value, (newNodeId) => {
  if (newNodeId && props.story?.all_nodes) {
    const node = props.story.all_nodes[newNodeId]
    
    currentNode.value = node
    isEnding.value = node.is_ending
    isWinningEnding.value = node.is_winning_ending || false

    if (!node.is_ending && node.options && node.options.length > 0) {
      options.value = node.options
    } else {
      options.value = []
    }
  }
})

const chooseOption = (optionId) => {
  currentNodeId.value = optionId
}

const restartStory = () => {
  if (props.story?.root_node) {
    currentNodeId.value = props.story.root_node.id
  }
}
</script>