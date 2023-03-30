/* eslint-disable react/jsx-no-bind */
import {TextInput} from '@sanity/ui'
import type {Photo as IPhoto} from 'pexels'
import React from 'react'
import type {AssetFromSource, AssetSourceComponentProps, ImageAsset} from 'sanity'
import {usePhotos} from '../hooks/usePhotos'
import {PexelsAssetSourceConfig} from '../types'
import {getPhotoDescription} from '../utils'
import Attribution from './Attribution'
import Photo from './Photo'
import Scroller from './Scroller'
import {CustomDialog} from './CustomDialog'
import {ImageGrid} from './Pexel.styled'

export const PexelsAssetSource = React.forwardRef(
  (props: AssetSourceComponentProps & {config: PexelsAssetSourceConfig}, ref) => {
    const {isLoading, items, loadMore, query, setQuery, setData} = usePhotos({
      API_KEY: props.config.API_KEY,
      results: props?.config?.results ?? {perPage: 25},
      searchTimeout: props?.config?.searchTimeout ?? 500,
    })

    const handleClose = () => {
      props.onClose()
    }

    const handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
      const searchInput = e.currentTarget
      setQuery(searchInput.value)
      setData((prev) => ({...prev, page: 0}))
    }

    const handleSelect = (photo: IPhoto) => {
      const photoDescription = getPhotoDescription(photo)
      const originalFilename = photo.src.original.split('/').pop()

      const asset: AssetFromSource = {
        kind: 'url',
        value: photo.src.original,
        assetDocumentProps: {
          _type: 'sanity.imageAsset',
          originalFilename,
          source: {
            name: photo.url,
            id: String(photo.id),
          },
          description: photoDescription,
          creditLine: `by ${photo.photographer} · url: ${photo.photographer_url}`,
        } as ImageAsset,
      }

      props.onSelect([asset])
    }

    return (
      <CustomDialog title={<Attribution />} onClose={handleClose} isOpen>
        <TextInput
          onChange={handleChange}
          placeholder="Enter keyword here to search for photos..."
          value={query}
          style={{display: 'fixed'}}
        />
        <Scroller onLoad={loadMore} name={query} isLoading={isLoading}>
          <ImageGrid>
            {!isLoading && items?.length === 0 && (
              <p>Oops! Try again with a different keyword...</p>
            )}
            {items?.map((photo) => (
              <Photo key={photo.id} onSelect={handleSelect} data={photo} />
            ))}
          </ImageGrid>
        </Scroller>
      </CustomDialog>
    )
  }
)
PexelsAssetSource.displayName = 'PexelsAssetSource'
