import React from 'react'
import {getPhotoDescription} from '../utils'
import styles from './Pexel.css'

const Photo = ({onSelect, ...photo}) => {
  const alt = getPhotoDescription(photo)

  return (
    <div className="image-item">
      <img src={photo.src.landscape} alt={alt} onClick={() => onSelect(photo)} />
      <div className={styles.by}>
        📸{' '}
        <a href={photo.photographer_url} target="_blank" style={{marginLeft: 5}}>
          <strong>{photo.photographer}</strong>
        </a>
      </div>
    </div>
  )
}

export default Photo
