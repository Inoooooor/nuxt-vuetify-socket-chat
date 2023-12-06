import { defineStore } from "pinia"

export const useNuxtStore = defineStore("nuxtStore", () => {
  const test = ref(0)

  const increment = () => test.value++

  const sleep = async (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms))

  const asyncIncrement = async () => {
    try {
      await sleep(2000)
      increment()
    } catch (error) {
      console.log(error)
    }
  }

  return { test, increment, asyncIncrement }
})
