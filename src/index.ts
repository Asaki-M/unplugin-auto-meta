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
      let tags: HtmlTagDescriptor[] = []
      if (!hasOptions(options)) {
        tags = genrateInitMeta()
      } else {
        for (let key in options) {
          options[key].forEach(opt => {
            if (key === 'names') {
              tags.push({
                tag: 'meta',
                attrs: {
                  name: opt.key,
                  content: opt.content
                },
                injectTo: 'head',
              })
            } else if (key === 'httpEquivs') {
              tags.push({
                tag: 'meta',
                attrs: {
                  'http-equiv': opt.key,
                  content: opt.content
                },
                injectTo: 'head'
              })
            } else {
              tags.push({
                tag: 'meta',
                attrs: {
                  charset: opt.charset
                },
                injectTo: 'head'
              })
            }
          })
        }
      }

      return tags
    },
  }
}

function hasOptions(options): boolean {
  return !!Object.keys(options).length
}

function genrateInitMeta(): HtmlTagDescriptor[] {
  const tags: HtmlTagDescriptor[] = [
    {
      tag: 'meta',
      attrs: {
        name: 'description',
        content: 'qinghuan',
      },
      injectTo: 'head',
    }, {
      tag: 'meta',
      attrs: {
        name: 'author',
        content: 'qinghuan',
      },
      injectTo: 'head',
    }, {
      tag: 'meta',
      attrs: {
        name: 'keywords',
        content: 'qinghuan',
      },
      injectTo: 'head',
    }, {
      tag: 'meta',
      attrs: {
        name: 'robots',
        content: 'all',
      },
      injectTo: 'head',
    },
  ]

  return tags
}
