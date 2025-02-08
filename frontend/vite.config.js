import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: [
      'adcampodaponte.site', // Adicione seu domínio aqui
      'www.adcampodaponte.site', // Adicione também a versão com www, se necessário
    ],
  },
})
