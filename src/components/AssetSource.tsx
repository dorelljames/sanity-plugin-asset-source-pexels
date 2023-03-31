import {AssetSourceComponentProps} from 'sanity'
import {PexelsAssetSourceConfig} from '../types'
import {PexelsAssetSource} from './PexelsAssetSource'

export function initPlugin(config: PexelsAssetSourceConfig) {
  const {API_KEY} = config

  if (!API_KEY) {
    throw new Error('Pexels API key is missing')
  }

  const Component = (args: AssetSourceComponentProps & {config: PexelsAssetSourceConfig}) => {
    return <PexelsAssetSource {...args} config={config} />
  }

  return {
    id: 'pexels',
    title: 'Pexels',
    component: Component,
  }
}
