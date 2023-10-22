# vue-plugin-remove-attributes

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![License][license-src]][license-href]

A utility plugin for removing specific attributes and directives from Vue components abstract syntax trees (AST).

When applied as a NodeTransform in the Vue.js compiler, it removes the specified attributes and directives from the AST nodes of a Vue.js component during the compilation process.

This allows you to customize the component's AST to suit your project's needs.

**Installation**
   ```bash
   # pnpm
   pnpm add vue-plugin-remove-attributes
   
   # bun
   bun install vue-plugin-remove-attributes
   
   # npm
   npm install vue-plugin-remove-attributes
   
   # yarn
   yarn add vue-plugin-remove-attributes
   ```

**Usage:**

In your `vite.config.ts`, add it to your `nodeTransforms`

```typescript
import createAttributesRemover from "vue-plugin-remove-attributes"

export default defineConfig({
    plugins: [vue({
        template: {
            compilerOptions: {
                nodeTransforms: [
                    // here add all attributes that you want to remove
                    createAttributesRemover([<attributes>]),
                ],
            },
        },
    })],
})
```

**Practical Example:**

Let's say you want to remove all `data-test` attributes in production.

You use them only in `unit-tests` and `e2e tests` and don't want to clutter the production build.

You could do something like this:

```typescript
   // other code

    nodeTransforms: [
      ...(process.env.NODE_ENV === 'production' ? [createAttributesRemover(['data-test'])] : [])
    ]

   // other code
```

## License

[MIT](./LICENSE) License © 2023-PRESENT [Mihai Plamadeala](https://github.com/lwvemike)


<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/vue-plugin-remove-attributes?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/vue-plugin-remove-attributes
[npm-downloads-src]: https://img.shields.io/npm/dm/vue-plugin-remove-attributes?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/vue-plugin-remove-attributes
[bundle-src]: https://img.shields.io/bundlephobia/minzip/vue-plugin-remove-attributes?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=vue-plugin-remove-attributes
[license-src]: https://img.shields.io/github/license/lwvemike/vue-plugin-remove-attributes.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/lwvemike/vue-plugin-remove-attributes/blob/main/LICENSE
