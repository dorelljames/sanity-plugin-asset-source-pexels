import {Photo} from 'pexels'

export const getPhotoDescription = (photo: Photo): string =>
  photo.url.split('/').splice(-2)[0].split('-').slice(0, -1).join(' ')
