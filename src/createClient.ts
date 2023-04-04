// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createClient = (API_KEY?: string) => {
  const baseURL = API_KEY
    ? 'https://api.pexels.com/v1'
    : 'https://sanity-plugin-asset-source-pexels-api-proxy.dorelljames.com'
  const headers = API_KEY
    ? {
        headers: {
          Authorization: API_KEY,
        },
      }
    : {}

  const getPhotos = (path: string, params: unknown) => {
    return fetch(`${baseURL}${path}?${new URLSearchParams(params as URLSearchParams)}`, {
      ...headers,
    })
      .then((res) => {
        if (!res.ok) {
          return {error: res.statusText}
        }

        return res.json()
      })
      .catch((err) => ({error: err}))
  }

  const photos = {
    search: (params: unknown) => getPhotos('/search', params),
    curated: (params: unknown) => getPhotos('/curated', params),
  }

  return {
    photos,
  }
}
