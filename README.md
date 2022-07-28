# unplugin-auto-meta
Automatically generate &lt;meta> or personalized genrate &lt;meta>

This plugin is a Vite Plugin, and you should use in Vite Project. By the way, it support `Vue2`, `Vue3`, `React`... When your project is Vite Project, you can use it to generate `<meta>` data.

Welcome to contrubute code [here](https://github.com/Asaki-M/unplugin-auto-meta).

# Usage

## Install
I suggest using pnpm to install because it can quickly install npm package and reuse installed package.

```
pnpm install unplugin-auto-meta

# or 
npm install unplugin-auto-meta

# or
yarn add unplugin-auto-meta
```

## Using

In vite.config.js / vite.config.ts

This is no `names`, `httpEquivs` and `charset` usage, see bellow: 
```js
import UnpluginAutoMeta from 'unplugin-auto-meta'

export default defineConfig({
  plugins: [
    vue(),
    UnpluginAutoMeta({
      name: 'vite-vue3',
      description: 'This is an amusing project, show us contents about vue3 and vite.',
      author: 'qinghuan',
    })
  ],
})
```

This is have `names`, `httpEquivs` and `charset` usage, if you set author(description, keywords) in `names` that can overflow `name`, `author`, `description`  see bellow: 
```js
import UnpluginAutoMeta from 'unplugin-auto-meta'

const options = {
  names: [
    { key: 'author', value: 'qinghuan22' },
  ],
  httpEquivs: [
    { key: 'Content-Security-Policy', content: "default-src 'self'; img-src https://*; child-src 'none';" },
  ]
}

export default defineConfig({
  plugins: [
    vue(),
    UnpluginAutoMeta({
      name: 'vite-vue3',
      description: 'This is an amusing project, show us contents about vue3 and vite.',
      author: 'qinghuan',
      ...options
    })
  ],
})
```
