export const getPhotoDescription = (photo) =>
  photo.url.split('/').splice(-2)[0].split('-').slice(0, -1).join(' ')
