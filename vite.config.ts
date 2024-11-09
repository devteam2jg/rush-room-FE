import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://dev.rushroom.kr/',
  build: {
    chunkSizeWarningLimit: 1600,
    manifest: true,
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
});
