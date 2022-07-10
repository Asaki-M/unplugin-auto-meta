import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnpluginAutoMeta from 'unplugin-auto-meta'

// https://vitejs.dev/config/

const options = {
  names: [
    { key: 'xx', content: 'xxx' },
  ],
  httpEquivs: [
    { key: 'xx', content: 'xxx' },
    { key: 'xx', content: 'xxx' },
  ],
}

export default defineConfig({
  plugins: [vue(), UnpluginAutoMeta(options)],
})
