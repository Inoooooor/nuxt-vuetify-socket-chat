// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["vuetify-nuxt-module"],
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      /* vuetify options */
    },
  },

  nitro: {
    plugins: ["./plugins/socket.io.server"],
  },

  devtools: { enabled: true },
})
