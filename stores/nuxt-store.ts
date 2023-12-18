import { defineStore } from "pinia"
import type { User } from "~/utils/User"

export const useNuxtStore = defineStore("nuxtStore", () => {
  const state = reactive({
    user: {},
    messages: ["bruh", "hello"],
  })

  const setUser = (user: User) => {
    state.user = user
  }

  const clear = () => {
    state.user = {}
    state.messages = []
  }

  return { state, setUser, clear }
})
