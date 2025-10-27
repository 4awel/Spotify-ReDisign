export default defineNuxtConfig({
  modules: ["@pinia/nuxt", "nuxt-mongoose"],
  css: ["~/assets/css/global.css"],
  ssr: false,
  runtimeConfig: {
    public: {
      apiBase: process.env.PORT_SERVER ? `http://localhost:${process.env.PORT_SERVER}` : 'http://localhost:4000'
    }
  },
    nitro: {
    preset: 'static'
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // Выносите большие библиотеки в отдельные чанки
            'vendor': ['vue', 'pinia'],
            'utils': ['axios', 'dayjs']
          }
        }
      }
    }
  },
  // Отложенная загрузка тяжелых компонентов
  features: {
    inlineStyles: false
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