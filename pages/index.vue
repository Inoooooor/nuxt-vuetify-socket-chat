<template>
  <p>Count: {{ state.counter }}</p>
  <v-btn @click="countUp"> Up </v-btn>
  <v-btn @click="countDown"> Down </v-btn>
  <div>STORE: {{ store.test }}</div>
  <v-btn @click="store.increment">increment</v-btn>
  <v-btn @click="store.asyncIncrement">async increment</v-btn>
</template>

<script setup lang="ts">
import { useNuxtStore } from "./../stores/nuxt-store"

definePageMeta({
  layout: "empty",
})

const store = useNuxtStore()

const state = reactive({
  counter: 0,
})
const stepSize = 5

const { $io } = useNuxtApp()

$io.connect()

$io.on(SocketEvent.new_count, (count) => {
  state.counter = count
  console.log("got from server", { count })
})

const countUp = () => {
  $io.emit(SocketEvent.up, { value: stepSize })
}

const countDown = () => {
  $io.emit(SocketEvent.down, { value: stepSize })
}
</script>
