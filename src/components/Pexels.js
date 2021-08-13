import React from 'react'
import Dialog from 'part:@sanity/components/dialogs/fullscreen'
import Search from 'part:@sanity/components/textfields/search'
import Photo from './Photo'
import Attribution from './Attribution'
import {getPhotoDescription} from '../utils'
import styles from './Pexel.css'
import usePhotos from '../hooks/usePhotos'
import Scroller from './Scroller'

const Pexels = React.forwardRef((props, ref) => {
  const {isLoading, items, loadMore, query, setQuery, setData} = usePhotos()

  const handleClose = () => {
    props.onClose()
  }

  const handleChange = (e) => {
    const searchInput = e.currentTarget
    setQuery(searchInput.value)
    setData((prev) => ({...prev, page: 0}))
  }

  const handleSelect = (photo) => {
    const photoDescription = getPhotoDescription(photo)
    const originalFilename = photo.src.original.split('/').pop()

    props.onSelect([
      {
        kind: 'url',
        value: photo.src.original,
        assetDocumentProps: {
          originalFilename,
          source: {
            name: photo.url,
            id: photo.id,
          },
          description: photoDescription,
          creditLine: `by ${photo.photographer} · url: ${photo.photographer_url}`,
        },
      },
    ])
  }

  return (
    <Dialog title={<Attribution />} onClose={handleClose} isOpen>
      <Search
        onChange={handleChange}
        placeholder="Enter keyword here to search for photos..."
        value={query}
        style={{display: 'fixed'}}
      />
      <Scroller onLoad={loadMore} name={query} isLoading={isLoading}>
        <div className={styles['image-grid']}>
          {!isLoading && items?.length === 0 && <p>Oops! Try again with a different keyword...</p>}
          {items?.map((photo) => (
            <Photo key={photo.id} onSelect={handleSelect} {...photo} />
          ))}
        </div>
      </Scroller>
    </Dialog>
  )
})

export default Pexels
