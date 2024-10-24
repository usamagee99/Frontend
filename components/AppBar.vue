<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" width="200">
        <v-list density="compact" item-props :items="items" nav />
  
        <template #append>
          <v-list-item
            class="ma-2"
            link
            nav
            prepend-icon="mdi-logout"
            @click="logoutSession"
            title="Logout"
          />
        </template>
      </v-navigation-drawer>
        <v-app-bar border="b" class="ps-4" flat>
        <v-app-bar-nav-icon v-if="$vuetify.display.smAndDown" @click="drawer = !drawer" />
  
        <v-app-bar-title>Device Data</v-app-bar-title>
      </v-app-bar>
    <v-main>
            <slot />
        </v-main>
</v-app>
  </template>

<script setup lang="ts">
import { ref } from 'vue'

const { loggedIn, user, session, fetch, clear } = useUserSession()

const drawer = ref(true)

const items = ref([
  {
    title: 'Device Data',
    prependIcon: 'mdi-file-chart-outline',
    link: true,
  },
])

const logoutSession = async () => {
  await clear()
    navigateTo({ path: '/login' })
};
</script>