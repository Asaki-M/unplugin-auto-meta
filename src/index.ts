import type { PluginOption, HtmlTagDescriptor } from 'vite';

export interface MetaOption {
  key: string
  content: string
}

export interface MetaPluginOptions {
  names?: MetaOption[]
  httpEquivs?: MetaOption[]
  charset?: string
}

export default function UnpluginAutoMeta(options?: MetaPluginOptions): PluginOption {
  return {
    name: 'unplugin-auto-meta',
    enforce: 'pre',
    apply: 'build',

    transformIndexHtml(html: string) {
      const tags: HtmlTagDescriptor[] = []

      const tag: HtmlTagDescriptor = {
        tag: 'meta',
        attrs: {
          name: 'author',
          content: 'qinghuan'
        },
        injectTo: 'head'
      }
      tags.push(tag)
      return tags
    },
  }
}
