import type { HtmlTagDescriptor, PluginOption } from 'vite'

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

    transformIndexHtml() {
      if (hasOptions(options)) {
        console.log(123)
      }
      const tags: HtmlTagDescriptor[] = []

      const tag: HtmlTagDescriptor = {
        tag: 'meta',
        attrs: {
          name: 'author',
          content: 'qinghuan',
        },
        injectTo: 'head',
      }
      tags.push(tag)
      return tags
    },
  }
}

function hasOptions(options): boolean {
  return !!Object.keys(options).length
}
