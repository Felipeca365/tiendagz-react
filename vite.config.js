import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Ruta base para GitHub Pages: debe ser IGUAL al nombre del repositorio
  base: '/tiendagz-react/',
})