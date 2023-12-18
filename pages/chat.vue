<template>
  <h1>chat page</h1>
  <!-- <div>{{ username }}</div> -->
  <div class="">
    <ul>
      <li
        v-for="(message, index) in messages"
        :key="index"
      >
        {{ message.text }}
      </li>
    </ul>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["chat"],
})
const store = useNuxtStore()

useHead({ titleTemplate: `Комната ${store.state.user.room}` })

const username = computed(() => store.state.user.name)
const messages = computed(() => store.state.messages)
</script>
