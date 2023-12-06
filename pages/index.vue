<template>
  <p>Count: {{ state.counter }}</p>
  <v-btn @click="countUp"> Up </v-btn>
  <v-btn @click="countDown"> Down </v-btn>
</template>

<script setup lang="ts">
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
