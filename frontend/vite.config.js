import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: [
      'adcampodaponte.site', // Domínio principal
      'www.adcampodaponte.site', // Versão com www
    ],
  }
});