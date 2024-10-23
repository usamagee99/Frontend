<template>
    <div>
      <AppBar>
      <slot />
      </AppBar>
    </div>
  </template>

<script setup lang="ts">
import { ref } from 'vue'
import AppBar from '~/components/AppBar.vue';
const drawer = ref(true)

const items = ref([
  {
    title: 'Device Data',
    prependIcon: 'mdi-file-chart-outline',
    link: true,
  },
])
</script>