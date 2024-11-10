import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
/* --DEV SERVER -- */
export default defineConfig({
  plugins: [react()],
  base: 'https://dev.rushroom.kr/', // prod server에는 'dev.' 떼면 끝. 그리고 .env.production 파일에서도 .dev 다 떼면 됨
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

/* -- LOCAL DEV SERVER -- */
// import { defineConfig, loadEnv } from 'vite';
// import react from '@vitejs/plugin-react';
//
// // https://vitejs.dev/config/
// export default defineConfig(({ mode }) => {
//   // Load environment variables based on the mode (e.g., 'development', 'production')
//   const env = loadEnv(mode, process.cwd(), '');
//
//   return {
//     base: '/', // 이것은 배포 시의 public path
//     plugins: [react()],
//     server: {
//       host: true, // 개발 서버 호스트
//       port: env.VITE_PORT || 3000,
//     },
//   };
// });
