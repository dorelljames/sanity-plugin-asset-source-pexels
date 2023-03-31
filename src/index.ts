import {definePlugin} from 'sanity'
import {initPlugin} from './components/AssetSource'
import type {PexelsAssetSourceConfig} from './types'

/**
 * Usage in `sanity.config.ts` (or .js)
 *
 * ```ts
 * import {defineConfig} from 'sanity'
 * import {pexelsImageAsset} from 'sanity-plugin-asset-source-pexels'
 * import { initPlugin } from './components/Pexels';
 *
 * export default defineConfig({
 *  plugins: [
 *   pexelsImageAsset({
 *    API_KEY: 'YOUR_PEXELS_API_KEY',
 *   }),
 * });
 * ```
 *
 * With additional optional parameters example:
 *
 * ```ts
 * export default defineConfig({
 *  plugins: [
 *   pexelsImageAsset({
 *    API_KEY: 'YOUR_PEXELS_API_KEY',
 *    results: {
 *      perPage: 50
 *    },
 *    searchTimeout: 1000
 *   }),
 * });
 * ```
 */
export const pexelsImageAsset = definePlugin<PexelsAssetSourceConfig>(
  ({API_KEY, results: {perPage = 24} = {}, searchTimeout = 500}) => {
    return {
      name: 'asset-source-pexels-plugin',

      form: {
        image: {
          assetSources: (prev) => {
            const AssetPexelsSourcePlugin = initPlugin({API_KEY, results: {perPage}, searchTimeout})
            return [...prev, AssetPexelsSourcePlugin]
          },
        },
      },
    }
  }
)
