/* eslint-disable react/jsx-no-bind */
import type {Photo as IPhoto} from 'pexels'
import {getPhotoDescription} from '../utils'
import {By, ImageItem} from './Pexel.styled'

const Photo = ({onSelect, data}: {onSelect: (photo: IPhoto) => void; data: IPhoto}) => {
  const alt = getPhotoDescription(data)

  return (
    <ImageItem>
      <img src={data.src.landscape} alt={alt} onClick={() => onSelect(data)} />
      <By>
        📸{' '}
        <a href={data.photographer_url} target="_blank" style={{marginLeft: 5}} rel="noreferrer">
          <strong>{data.photographer}</strong>
        </a>
      </By>
    </ImageItem>
  )
}

export default Photo
