import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/** En GitHub Pages usa VITE_BASE_PATH=/<nombre-repo>/ (ej. /DentalS/) */
const base = process.env.VITE_BASE_PATH || '/'

export default defineConfig({
  base,
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
