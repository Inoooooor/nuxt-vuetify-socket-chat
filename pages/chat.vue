<template>
  <h1>chat page</h1>
  <div>{{ username }}</div>
</template>

<script setup>
definePageMeta({
  middleware: ["chat"],
})
const store = useNuxtStore()

useHead({ titleTemplate: `Комната ${store.state.user.room}` })

const username = computed(() => store.state.user.name)
</script>
