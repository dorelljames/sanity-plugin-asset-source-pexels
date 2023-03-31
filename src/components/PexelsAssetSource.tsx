/* eslint-disable react/jsx-no-bind */
import {Dialog, TextInput, Flex, Spinner, Text, Box} from '@sanity/ui'
import type {Photo as IPhoto} from 'pexels'
import React from 'react'
import type {AssetFromSource, AssetSourceComponentProps, ImageAsset} from 'sanity'
import {usePhotos} from '../hooks/usePhotos'
import {PexelsAssetSourceConfig} from '../types'
import {getPhotoDescription} from '../utils'
import Attribution from './Attribution'
import Photo from './Photo'
import Scroller from './Scroller'
import {ImageGrid} from './Pexel.styled'
import InfiniteScroll from 'react-infinite-scroll-component'

export const PexelsAssetSource = React.forwardRef(
  (props: AssetSourceComponentProps & {config: PexelsAssetSourceConfig}, ref) => {
    const {isLoading, hasNextPage, items, loadMore, query, setQuery, setData} = usePhotos({
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
      <Dialog
        open
        header={<Attribution />}
        id="pexels-asset-source"
        onClose={handleClose}
        width={4}
      >
        <Box padding={2}>
          <TextInput
            onChange={handleChange}
            placeholder="Enter keyword here to search for photos..."
            value={query}
            style={{display: 'fixed'}}
          />
          <InfiniteScroll
            dataLength={items.length}
            next={loadMore}
            hasMore={hasNextPage}
            scrollThreshold={0.99}
            height="60vh"
            loader={
              <Flex align="center" justify="center" padding={3}>
                <Spinner muted />
              </Flex>
            }
            endMessage={
              <Text size={1} muted>
                No more results
              </Text>
            }
          >
            <ImageGrid>
              {items?.map((photo) => (
                <Photo key={photo.id} onSelect={handleSelect} data={photo} />
              ))}
            </ImageGrid>
          </InfiniteScroll>

          {/* <Scroller onLoad={loadMore} name={query} isLoading={isLoading}>
            <ImageGrid>
              {!isLoading && items?.length === 0 && (
                <p>Oops! Try again with a different keyword...</p>
              )}
              {items?.map((photo) => (
                <Photo key={photo.id} onSelect={handleSelect} data={photo} />
              ))}
            </ImageGrid>
          </Scroller> */}
        </Box>
      </Dialog>
    )
  }
)
PexelsAssetSource.displayName = 'PexelsAssetSource'
