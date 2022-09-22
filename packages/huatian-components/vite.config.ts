import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 如果项目中使用tsx需要用到这个插件
import jsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4002
  },
  plugins: [vue(), jsx()]
})
