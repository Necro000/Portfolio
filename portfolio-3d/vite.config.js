import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Exposes dev server for local network testing
    port: 5173,
  },
  build: {
    chunkSizeWarningLimit: 750,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalized = id.replace(/\\/g, '/')
          if (normalized.includes('/node_modules/three/')) {
            return 'vendor-three'
          }
          if (
            normalized.includes('/node_modules/@react-three/') ||
            normalized.includes('/node_modules/r3f-')
          ) {
            return 'vendor-fiber'
          }
          if (
            normalized.includes('/node_modules/postprocessing/') ||
            normalized.includes('/node_modules/@react-three/postprocessing/')
          ) {
            return 'vendor-postprocessing'
          }
          if (
            normalized.includes('/node_modules/gsap/') ||
            normalized.includes('/node_modules/lenis/')
          ) {
            return 'vendor-animation'
          }
        },
      },
    },
  },
})
