import {definePlugin} from 'sanity'
import {initPlugin} from './components/AssetSource'
import type {PexelsAssetSourceConfig} from './types'

class ConfigurationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ConfigurationError'
  }
}

/**
 * Usage in `sanity.config.ts` (or .js)
 *
 * ```ts
 * import {defineConfig} from 'sanity'
 * import {pexelsImageAsset} from 'sanity-plugin-asset-source-pexels'
 *
 * export default defineConfig({
 *   plugins: [
 *     pexelsImageAsset({
 *       API_KEY: 'YOUR_PEXELS_API_KEY',
 *     }),
 *   ]
 * });
 * ```
 *
 * Using proxy client:
 *
 * ```ts
 * export default defineConfig({
 *   plugins: [
 *     pexelsImageAsset({
 *       useProxyClient: true,
 *     }),
 *   ]
 * });
 * ```
 *
 * With additional options:
 *
 * ```ts
 * export default defineConfig({
 *   plugins: [
 *     pexelsImageAsset({
 *       API_KEY: 'YOUR_PEXELS_API_KEY',
 *       results: {
 *         perPage: 50,
 *       },
 *       searchTimeout: 1000,
 *     }),
 *   ],
 * })
 * ```
 */
export const pexelsImageAsset = definePlugin<PexelsAssetSourceConfig>(
  (options: PexelsAssetSourceConfig) => {
    if ('useProxyClient' in options && typeof options.useProxyClient !== 'boolean') {
      throw new ConfigurationError(
        'Invalid configuration! `useProxyClient` must be a boolean. (See README.md)'
      )
    }

    if ((!('useProxyClient' in options) || options.useProxyClient === false) && !options.API_KEY) {
      throw new ConfigurationError(
        'Invalid configuration! Missing Pexels API key, please provide `API_KEY` when you initialize the plugin or set `useProxyClient` to true. (See README.md)'
      )
    }

    if ('useProxyClient' in options && options.useProxyClient === true && options.API_KEY) {
      throw new ConfigurationError(
        'Invalid configuration! `API_KEY` and `useProxyClient` cannot be used together. (See README.md)'
      )
    }

    if ('searchTimeout' in options && typeof options.searchTimeout !== 'number') {
      throw new ConfigurationError(
        'Invalid configuration! `searchTimeout` must be a number. (See README.md)'
      )
    }

    if (
      'results' in options &&
      (!('perPage' in options.results!) || typeof options.results.perPage !== 'number')
    ) {
      throw new ConfigurationError(
        'Invalid configuration! `results.perPage` must set and a number (See README.md)'
      )
    }

    return {
      name: 'asset-source-pexels-plugin',

      form: {
        image: {
          assetSources: (prev) => {
            const AssetPexelsSourcePlugin = initPlugin(options)
            return [...prev, AssetPexelsSourcePlugin]
          },
        },
      },
    }
  }
)
