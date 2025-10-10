// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@pinia/nuxt", "nuxt-mongoose"],
  css: ["~/assets/css/global.css"],
    ssr: true,
  nitro: {
    preset: 'netlify'
  },
  app: {
    baseURL: '/',
    buildAssetsDir: '/_nuxt/'
  }
});
