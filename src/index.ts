import type { PluginOption } from 'vite';

export default function createUnplugin(): PluginOption {
  return {
    name: 'unplugin-auto-meta',
    enforce: 'pre',
    apply: 'build',

    transformIndexHtml(html) {
      console.log(html);
    },
  }
}
