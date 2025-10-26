export default defineNuxtConfig({
  modules: ["@pinia/nuxt", "nuxt-mongoose"],
  css: ["~/assets/css/global.css"],
  ssr: true,
  runtimeConfig: {
    public: {
      apiBase: process.env.PORT_SERVER ? `http://localhost:${process.env.PORT_SERVER}` : 'http://localhost:4000'
    }
  },
  
  app: {
    baseURL: "/",
    buildAssetsDir: "/_nuxt/",
    head: {
      viewport: "width=device-width, initial-scale=1.0",
      charset: "utf-8",
    },
  },
});