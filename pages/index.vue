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
    <v-card
      width="400"
      height="400"
      class="mx-auto"
    >
      <v-card-title class="text-center">
        <h1>Nuxt Чат</h1>
      </v-card-title>
      <v-card-text>
        <v-form
          @submit.prevent="submit"
          ref="form"
        >
          <v-text-field
            v-model="firstName"
            label="Ваше имя"
            :rules="firstNameRules"
            required
          ></v-text-field>

          <v-text-field
            v-model="room"
            label="Комната"
            :rules="roomInputRules"
          ></v-text-field>

          <v-btn
            type="submit"
            block
            class="mt-2"
            color="primary"
            >Войти
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script setup lang="ts">
import { useNuxtStore } from "./../stores/nuxt-store"

definePageMeta({
  layout: "empty",
})

useHead({ title: "Добро пожаловать в Nuxt чат" })

const store = useNuxtStore()

// console.log(store.state.user)

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

$io.on(SocketEvent.new_message, (newMessage: ChatMessage) => {
  store.newMessage(newMessage)
  // console.log("got newMessage from server", { newMessage })
})

const countUp = () => {
  $io.emit(SocketEvent.up, { value: stepSize })
}

const countDown = () => {
  $io.emit(SocketEvent.down, { value: stepSize })
}

const userJoinedHandler = (user: User) => {
  $io.emit(SocketEvent.user_joined, user, (data: any) => {
    if (data === SocketErrors.wrong_form_input) {
      console.error(SocketErrors.wrong_form_input)
    } else {
      user.id = data.userId
      store.setUser(user)
      navigateTo("/chat")
    }
  })
}

const firstName = ref("")
const room = ref("")
const form = ref()

const submit = async () => {
  // console.log("valid", form.value)
  const { valid } = await form.value?.validate()

  if (valid) {
    // alert("Form is valid")
    const user: User = { name: firstName.value, room: room.value }

    userJoinedHandler(user)
  }
}

// onMounted(() => {
//   console.log(form.value)
// })

const firstNameRules = [
  (v: string) => !!v || "Введите имя",
  (v: string) => v?.length >= 3 || "Имя должно иметь минимум 3 символа",
  (v: string) => v?.length <= 16 || "Имя не должно превышать 16 символов",
]
const roomInputRules = [
  (v: string) => !!v || "Поле не должно быть пустым",
  // (v: string) => /[^0-9]/.test(v) || "Last name can only not contain digits.",
]
</script>
