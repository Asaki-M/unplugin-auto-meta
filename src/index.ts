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
    apply(config, { command }) {
      return command === 'build' && !config.build?.ssr
    },

    transformIndexHtml: async () => {
      let tags: HtmlTagDescriptor[] = []
      if (!hasOptions(options)) {
        // const packageJson = await import('../package.json')
        // const { name, description, author }: { name?: string, description?: string, author?: string } = packageJson.default
        // tags = genrateInitMeta(name, description, author)
        tags = genrateInitMeta('', '', '')
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
  return !!options && !!Object.keys(options).length
}

function genrateInitMeta(
  name: string | undefined,
  description: string | undefined,
  author: string | undefined
): HtmlTagDescriptor[] {
  name = name || ''
  description = description || ''
  author = author || ''
  const tags: HtmlTagDescriptor[] = [
    {
      tag: 'meta',
      attrs: {
        name: 'description',
        content: description,
      },
      injectTo: 'head',
    }, {
      tag: 'meta',
      attrs: {
        name: 'author',
        content: author,
      },
      injectTo: 'head',
    }, {
      tag: 'meta',
      attrs: {
        name: 'keywords',
        content: name,
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
