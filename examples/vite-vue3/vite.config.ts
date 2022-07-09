import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnpluginAutoMeta from 'unplugin-auto-meta'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), UnpluginAutoMeta()]
})
