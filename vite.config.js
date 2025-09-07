import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'main_app',
      remotes: {
        music_library: 'http://localhost:4173/assets/remoteEntry.js'
      },
      shared: ['react', 'react-dom']
    })
  ],
  server: {
    port: 5173
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      }
    }
  },
  preview: {
    port: 4173
  }
})
