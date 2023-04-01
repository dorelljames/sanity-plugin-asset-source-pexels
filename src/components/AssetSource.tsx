import {AssetSourceComponentProps} from 'sanity'
import {PexelsAssetSourceConfig} from '../types'
import {PexelsAssetSource} from './PexelsAssetSource'
import PexelsIcon from './PexelsIcon'

export function initPlugin(config: PexelsAssetSourceConfig) {
  const Component = (args: AssetSourceComponentProps & {config: PexelsAssetSourceConfig}) => {
    return <PexelsAssetSource {...args} config={config} />
  }

  return {
    id: 'pexels',
    title: 'Pexels',
    component: Component,
    icon: PexelsIcon,
  }
}
