import React from 'react'
import {createClient} from 'pexels'
import useDebounce from './useDebounce'
import config from 'config:asset-source-pexels'

const client = createClient(config['api-key'])

function usePhotos() {
  const [state, setState] = React.useState('idle') // loading > success | error
  const [data, setData] = React.useState({
    photos: [],
    page: 0, // offset to start at page 1
  })
  const [query, setQuery] = React.useState('')
  const debouncedQuery = useDebounce(query, config?.searchTimeout || 500)
  const per_page = config?.results?.per_page || 24

  const loadMore = () => {
    setState('loading')

    const search = debouncedQuery
      ? client.photos.search({query: debouncedQuery, per_page, page: data?.page + 1})
      : client.photos.curated({per_page, page: data?.page + 1})

    return search
      .then((result) => {
        if (result.page > 1) {
          return setData((prev) => ({
            ...prev,
            ...result,
            photos: [...data.photos, ...result.photos],
          }))
        }

        return setData(result)
      })
      .then(() => setState('success'))
      .catch(() => setState('error'))
  }

  // fetches curated photos
  React.useEffect(() => {
    setState('loading')
    loadMore()
  }, [])

  // fetches photos based on query
  React.useEffect(() => {
    if (debouncedQuery) {
      setState('loading')
      loadMore()
    }
  }, [debouncedQuery])

  return {
    state,
    setState,
    query,
    setQuery,
    data,
    setData,
    isLoading: state === 'loading',
    items: data?.photos,
    hasNextPage: !!data.photos.next_page,
    error: state === 'error',
    loadMore,
  }
}

export default usePhotos
