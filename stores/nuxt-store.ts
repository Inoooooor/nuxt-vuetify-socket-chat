import { defineStore } from "pinia"
import type { User } from "~/utils/User"
import type { ChatMessage } from "~/utils/ChatMessage"

export const useNuxtStore = defineStore("nuxtStore", () => {
  const state = reactive({
    user: {},
    messages: new Array(),
  })

  const setUser = (user: User) => {
    state.user = user
  }

  const newMessage = (message: ChatMessage) => {
    state.messages.push(message)
  }

  const clear = () => {
    state.user = {}
    state.messages = []
  }

  return { state, setUser, clear, newMessage }
})
