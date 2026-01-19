import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/portfolio/', // replace 'repo-name' with your actual GitHub repo name
  plugins: [react()]
})
