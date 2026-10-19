import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './', // Ensures static deployment compatibility on Vercel, Netlify, and GitHub Pages
  build: {
    target: 'esnext',
  },
})
