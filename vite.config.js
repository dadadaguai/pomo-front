import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      '@': path.resolve(__dirname, '.'), // 这里将 @ 指向根目录
    },
  },
  plugins: [react()],
  server: {
    port: 3000 // 更改为其他端口
  }
})
