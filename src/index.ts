import type { HtmlTagDescriptor, PluginOption } from 'vite'

export interface MetaOption {
  key: string
  content: string
}

export interface MetaPluginOptions {
  author: string
  description: string
  keywords?: string
  names?: MetaOption[]
  httpEquivs?: MetaOption[]
  charset?: string
}

export default function UnpluginAutoMeta(options: MetaPluginOptions): PluginOption {
  return {
    name: 'unplugin-auto-meta',
    enforce: 'pre',
    apply(config, { command }) {
      return command === 'build' && !config.build?.ssr
    },

    transformIndexHtml: async () => {
      let tags: HtmlTagDescriptor[] = []
      const { description, author } = options
      tags = genrateInitMeta(description, author, options.keywords)
      for (let key in options) {
        if (key === 'keywords' || key === 'author' || key === 'description') continue
        if (key === 'charset') {
          tags.push({
            tag: 'meta',
            attrs: {
              charset: options.charset
            },
            injectTo: 'head'
          })
          continue
        }
        for (let opt of options[key]) {
          if (key === 'names') {
            verifyAndDel(tags, opt.key)
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
          }
        }
      }
      return tags
    },
  }
}

function verifyAndDel(tags: HtmlTagDescriptor[], key: string): void {
  const idx = tags.findIndex(item => item.attrs?.name === key)
  if (idx === -1) return
  tags.splice(idx, 1)
}

// const TOPCOUNT = 5
function genrateInitMeta(
  description: string,
  author: string,
  keywords?: string
): HtmlTagDescriptor[] {
  // if (!keywords) {
  //   const kws = nodejieba.extract(description, TOPCOUNT).reduce((prev, curr) => prev += `${curr.word}, `, '')
  //   keywords = kws.slice(0, kws.length - 2)
  // }
  keywords = keywords || ''
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
        content: keywords,
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
