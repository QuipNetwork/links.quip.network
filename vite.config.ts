import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api/luma': {
        target: 'https://api.lu.ma',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/luma/, ''),
      },
    },
  },
  build: {
    outDir: 'dist',
  },
})
