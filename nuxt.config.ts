// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      socketPort: 3001,
      url: "http://localhost",
    },
  },
  plugins: ["./plugins/socket.io"],

  modules: ["vuetify-nuxt-module", "@pinia/nuxt"],
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      /* vuetify options */
      theme: {
        defaultTheme: "dark",
      },
    },
  },

  nitro: {
    plugins: ["./plugins/socket.io.server"],
  },

  devtools: { enabled: true },
})
