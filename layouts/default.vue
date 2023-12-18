<template>
  <v-theme-provider theme="dark">
    <v-layout class="rounded rounded-md">
      <v-navigation-drawer
        width="400"
        v-model="drawer"
      >
        <v-list>
          <v-list-subheader>Список людей в комнате</v-list-subheader>

          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :value="item"
            color="primary"
            variant="plain"
          >
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>

            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar>
        <v-toolbar>
          <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
          <v-btn
            class="ma-2"
            color="blue-darken-2"
            variant="flat"
            @click="exit"
          >
            <v-icon
              start
              icon="mdi-arrow-left"
            ></v-icon>
            Назад
          </v-btn>
          <v-toolbar-title>Чат комнаты {{ chatRoom }}</v-toolbar-title>
        </v-toolbar>
      </v-app-bar>

      <v-main
        class="d-flex align-center justify-center"
        style="min-height: 300px"
      >
        <slot />
      </v-main>
    </v-layout>
  </v-theme-provider>
</template>

<script setup>
const store = useNuxtStore()

const chatRoom = computed(() => store.state.user.room)

const drawer = ref(false)

const items = ref([
  { text: "Real-Time", icon: "mdi-account" },
  { text: "Audience", icon: "mdi-account" },
  { text: "Conversions", icon: "mdi-account" },
])

const toggleDrawer = () => (drawer.value = !drawer.value)

const exit = () => {
  store.clear()

  navigateTo("/?message=leftChat")
}
</script>
