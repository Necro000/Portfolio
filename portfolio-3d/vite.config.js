import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Exposes the dev server to the local network (Wi-Fi) for testing on physical mobile phones
    port: 5173,
  },
})
