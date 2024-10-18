import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwind from 'tailwindcss'


// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(),],
    },
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@apps': fileURLToPath(new URL('../apps/server-limit', import.meta.url)),
      'packages': fileURLToPath(new URL('./packages', import.meta.url)),
    }
  }
})
