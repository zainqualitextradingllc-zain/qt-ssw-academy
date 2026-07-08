import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/qt-ssw-academy/',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'dev-index-html',
      configureServer(server) {
        return () => {
          server.middlewares.use((req, _res, next) => {
            const url = req.url ?? ''
            if (
              url === '/' ||
              url === '/index.html' ||
              url === '/qt-ssw-academy/' ||
              url === '/qt-ssw-academy/index.html'
            ) {
              req.url = '/index.dev.html'
            }
            next()
          })
        }
      },
    },
  ],
  build: {
    rollupOptions: {
      input: resolve(__dirname, 'index.dev.html'),
    },
  },
})
