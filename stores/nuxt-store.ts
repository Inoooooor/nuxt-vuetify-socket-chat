import { defineStore } from "pinia"
import type { User } from "~/utils/User"

export const useNuxtStore = defineStore("nuxtStore", () => {
  const state = reactive({
    user: {},
  })

  const setUser = (user: User) => {
    state.user = user
  }

  return { state, setUser }
})
