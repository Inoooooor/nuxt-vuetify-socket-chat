// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      socketPort: 3001,
      url: "http://localhost",
    },
  },
  plugins: ["./plugins/socket.io"],

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
