// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["vuetify-nuxt-module", "nuxt-socket-io"],
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      /* vuetify options */
    },
  },
  io: {
    // module options
    sockets: [
      {
        name: "main",
        url: "http://localhost:3000",
      },
    ],
  },

  devtools: { enabled: true },
})
