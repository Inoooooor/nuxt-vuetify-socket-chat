<template>
  <div>{{ data }}</div>
  <v-btn> Button </v-btn>
</template>

<script setup lang="ts">
const { data } = await useFetch("/api/hello")

onMounted(() => {
  const ctx = useNuxtApp()

  const socket = ctx.$nuxtSocket({
    channel: "/index",
    reconnection: false,
  })

  socket.emit("hello", "world", (resp: any) => {
    /* handle resp */
    console.log("resp", resp)
  })
})
</script>
