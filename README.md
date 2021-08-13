# sanity-plugin-asset-source-pexels

## Installation

```
sanity install asset-source-pexels
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
