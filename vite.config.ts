import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // 환경 변수 로드
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    base: env.VITE_APP_API_BASE_URL || 'https://dev.rushroom.kr/', // 환경변수가 없을 경우 기본값 사용
    build: {
      chunkSizeWarningLimit: 1600,
      manifest: true,
      rollupOptions: {
        input: {
          main: './index.html',
        },
      },
    },
  };
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
