export default defineNuxtConfig({
  modules: ["@pinia/nuxt"],
  css: ["~/assets/css/global.css"],
  // Приложение клиентское (токен в localStorage), статический хостинг — SPA
  ssr: false,

  runtimeConfig: {
    public: {
      // В проде задаётся через NUXT_PUBLIC_API_BASE (адрес сервера на Render)
      apiBase:
        process.env.NUXT_PUBLIC_API_BASE ||
        (process.env.PORT_SERVER
          ? `http://localhost:${process.env.PORT_SERVER}`
          : "http://localhost:4000"),
    },
  },

  app: {
    baseURL: "/",
    buildAssetsDir: "/_nuxt/",
    head: {
      viewport: "width=device-width, initial-scale=1.0",
      charset: "utf-8",
    },
  },

  compatibilityDate: "2026-05-12"
});