# unplugin-auto-meta
Automatically generate &lt;meta> or personalized genrate &lt;meta>

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

```js
import UnpluginAutoMeta from 'unplugin-auto-meta'

const options = {
  names: [
    { key: 'author', content: 'qinghuan' },
  ],
  httpEquivs: [
    { key: 'Content-Security-Policy', content: "default-src 'self'; img-src https://*; child-src 'none';" },
  ],
}

export default defineConfig({
  plugins: [vue(), UnpluginAutoMeta(options)],
})
```
