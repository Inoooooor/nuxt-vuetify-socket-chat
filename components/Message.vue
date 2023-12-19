<template>
  <div></div>
</template>

<script setup lang="ts">
defineProps({
  name: String,
  text: String,
  isOwner: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped></style>
