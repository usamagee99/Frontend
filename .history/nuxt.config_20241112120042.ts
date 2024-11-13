// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  runtimeConfig: {
    public: {
      //apiBaseURL: 'https://devices.utnt.net/utnt_fastapi_server',
      apiBaseURL: 'http://127.0.0.1:8000',
      baseURL: '/webapp/'
      //baseURL: '/'
    }
  },
  app: {
    baseURL: '/webapp/'
  },
  modules: [
    'nuxt-auth-utils',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    //...
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  }
})
