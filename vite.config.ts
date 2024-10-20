import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables based on the mode (e.g., 'development', 'production')
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: '/', // 이것은 배포 시의 public path
    plugins: [react()],
    server: {
      host: true, // 개발 서버 호스트
      port: env.VITE_PORT || 3000,
    },
  };
});
