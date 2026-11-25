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
  // 部署到 GitHub Pages 子路径：https://yearn1208.github.io/Personal-Website/
  // 仓库改名时这里要同步修改。
  base: '/Personal-Website/',
})
