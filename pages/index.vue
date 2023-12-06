<template>
  <div>{{ data }}</div>
  <v-btn> Button </v-btn>
</template>

<script setup lang="ts">
const { data } = await useFetch("/api/hello")
</script>
