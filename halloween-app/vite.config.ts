// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: [
      'disallowable-jaimie-lamented.ngrok-free.dev' // the ngrok URL
    ]
  }
})
