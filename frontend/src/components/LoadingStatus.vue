<template>
  <div class="loading-container">
    <h2>Generating Your {{ theme }} Story</h2>
    <div class="loading-animation">
      <div class="spinner"></div>
    </div>
    <p class="loading-info">
      Please wait while we generate your story...
    </p>
  </div>
</template>

<script setup>
defineProps({
  theme: String
})
</script>