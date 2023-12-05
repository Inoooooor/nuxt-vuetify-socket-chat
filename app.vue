<template>
  <div>{{ data }}</div>
  <v-btn> Button </v-btn>

  <div>
    <NuxtWelcome />
  </div>
</template>

<script setup lang="ts">
const { data } = await useFetch("/api/hello")
</script>
