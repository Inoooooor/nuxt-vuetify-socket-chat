<template>
  <!-- <div>{{ username }}</div> -->
  <div class="chat-page position-relative h-100 pa-10">
    <h1>chat page</h1>
    <div class="chat-messages">
      <ul>
        <li
          v-for="(message, index) in messages"
          :key="index"
        >
          {{ message.text }}
        </li>
      </ul>
    </div>
    <v-sheet
      height="100px"
      width="100%"
      position="absolute"
      location="bottom"
      class=""
    ></v-sheet>
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

<style scoped>
.chat-form {
}
</style>
