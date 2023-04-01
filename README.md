# sanity-plugin-asset-source-pexels

| This is a v2 plugin for Sanity Studio and will soon be discontinued. If you're on v3, please follow [this link](https://github.com/dorelljames/sanity-plugin-asset-source-pexels).

> Be careful with your *API key*. If you use this Sanity plugin, it's a good idea to make your repository private. Technically, the said API key can be accessed inside of the JS-bundle if someone knows the domain for the studio.

## Installation

```
npm install asset-source-pexels@0.0.2
```

or

```
yarn add asset-source-pexels@0.0.2
```

## Configuration

The plugin can be configured through `<your-studio-folder>/config/asset-source-pexels.json`:

```json
{
  "api-key": "<PEXELS-API-KEY>",
  "results": {
    "per_page": 24
  },
  "searchTimeout": 500
}
```

For now, this is a [bring your own API key](https://www.pexels.com/api/new/). In next release, I'll make it optional behind a proxy while also retaining the capability to use your own of course. Anyone wants to help out, sure, appreciate it.

You can configure how many photos are returned initially on load, from search and succeeding results via `results.per_page` which is initially set to `24`. Also by default, we set your search keyword to debounced by `500` milliseconds so as not to blast your API usage as soon as your search keyword changes.

## License

MIT © Dorell James
See LICENSE
