import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnpluginAutoMeta from 'unplugin-auto-meta'

// https://vitejs.dev/config/

const options = {
  names: [
    { key: 'author', content: 'qinghuan' },
  ],
  httpEquivs: [
    { key: 'Content-Security-Policy', content: "default-src 'self'; img-src https://*; child-src 'none';" },
  ],
}

export default defineConfig({
  plugins: [vue(), UnpluginAutoMeta()],
})
