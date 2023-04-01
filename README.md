# sanity-plugin-asset-source-pexels

| This is a Sanity Studio v3 plugin. For the v2 version, please refer to the [v2-branch](https://github.com/dorelljames/sanity-plugin-asset-source-pexels/tree/v2-branch)

## What is it?

Search for photos on Pexels and add them to your project inside Sanity Studio.

## Installation

```bash
sanity install asset-source-pexels
```

or

```bash
npm install --save sanity-plugin-asset-source-pexels

```

or

```bash
yarn add sanity-plugin-asset-source-pexels
```

## Configuration

### Using your own API (recommended)

The plugin can be configured to provide your [Pexels API Key](https://www.pexels.com/api/new/).

```ts
export default defineConfig({
  plugins: [
    pexelsImageAsset({
      API_KEY: 'YOUR_PEXELS_API_KEY',
    }),
  ],
})
```

> Be careful with your _API key_. If you use this Sanity plugin, it's a good idea to make your repository private. Technically, the said API key can be accessed inside of the JS-bundle if someone knows the domain for the studio.

---

### Using proxy client (alternative)

Alternatively, if you like to use the proxy client hosted in AWS ([source here](https://github.com/dorelljames/sanity-plugin-asset-source-pexels-api-proxy)), then all you need to do is add it as a plugin in your `sanity.config.ts` (or `.js`).

```ts
export default defineConfig({
  plugins: [
    pexelsImageAsset({
      useProxyClient: true,
    }),
  ],
})
```

I don't have the resource to always make sure the proxy client is available at all times so use at your own discretion.

---

### Additional options

You can configure how many photos are returned initially on load from search and succeeding results via `results.perPage` which is by default set to `24`. Also, we set your search keyword to debounced by `500` ms so as not to blast your API usage as soon as your search keyword changes. You can change this with by adjusting `searchKeyword` to any number of your liking.

```ts
export default defineConfig({
  plugins: [
    pexelsImageAsset({
      // ..., <- previous config here `API_KEY` or `useProxyClient`
      results: {
        perPage: 50,
      },
      searchTimeout: 1000,
    }),
  ],
})
```

## Manually configure asset sources

If you need to configure when Pexels should be available as an asset source, filter it out as needed in `form.image.assetSources`:

```ts
import {pexelsImageAsset} from 'sanity-plugin-asset-source-pexels'

export default defineConfig({
  // ...
  plugins: [pexelsImageAsset()],
  form: {
    image: {
      assetSources: (previousAssetSources, {schema}) => {
        if (schema.name === 'movie-image') {
          // remove pexels from `movie-image` types
          return previousAssetSources.filter(({name}) => name !== 'pexels')
        }
        return previousAssetSources
      },
    },
  },
})
```

## License

MIT © Dorell James
See LICENSE
