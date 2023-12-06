<template>
  <v-layout class="flex-column">
    <!-- <v-row no-gutters>
      <p>Count: {{ state.counter }}</p>
      <v-btn @click="countUp"> Up Socket </v-btn>
      <v-btn @click="countDown"> Down Socket </v-btn>
    </v-row>
    <v-row>
      <div>STORE: {{ store.test }}</div>
      <v-btn @click="store.increment">increment Store</v-btn>
      <v-btn @click="store.asyncIncrement">async increment Store</v-btn>
    </v-row>
    <v-row>
      <v-col
        v-for="n in 3"
        :key="n"
        sm="4"
        lg="12"
        :class="`bg-amber-accent-${n}`"
      >
        col # {{ n }}</v-col
      >
    </v-row> -->
    <v-sheet
      width="400"
      height="400"
      class="mx-auto"
    >
      <v-form
        fast-fail
        @submit.prevent
      >
        <v-text-field
          v-model="firstName"
          label="First name"
          :rules="firstNameRules"
        ></v-text-field>

        <v-text-field
          v-model="lastName"
          label="Last name"
          :rules="lastNameRules"
        ></v-text-field>

        <v-btn
          type="submit"
          block
          class="mt-2"
          >Submit</v-btn
        >
      </v-form>
    </v-sheet>
  </v-layout>
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

const firstName = ref("")
const lastName = ref("")
const firstNameRules = [
  (value: string) => {
    if (value?.length > 3) return true

    return "First name must be at least 3 characters."
  },
]
const lastNameRules = [
  (value: string) => {
    if (/[^0-9]/.test(value)) return true

    return "Last name can not contain digits."
  },
]
</script>
