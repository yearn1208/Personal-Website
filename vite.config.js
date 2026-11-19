import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  // 如果部署到 GitHub Pages 的子路径（如 https://user.github.io/repo/），
  // 把下面的 base 改成 '/repo/' 即可。
  base: '/',
})
