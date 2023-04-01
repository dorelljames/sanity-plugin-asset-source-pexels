interface BasePexelsAssetSourceConfig {
  API_KEY?: string
  results?: {
    perPage?: number
  }
  searchTimeout?: number
}

interface OptionsWithoutProxy extends BasePexelsAssetSourceConfig {
  useProxyClient?: false
  API_KEY: string
}

interface OptionsWithProxy extends BasePexelsAssetSourceConfig {
  useProxyClient: true
}

export type PexelsAssetSourceConfig = OptionsWithoutProxy | OptionsWithProxy
