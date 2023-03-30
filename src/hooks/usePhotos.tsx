/* eslint-disable camelcase */
import React from 'react'
import {Photos, createClient} from 'pexels'
import useDebounce from './useDebounce'
import type {PexelsAssetSourceConfig} from '../types'

export function usePhotos(config: PexelsAssetSourceConfig) {
  const {API_KEY} = config
  const client = React.useMemo(() => createClient(API_KEY), [API_KEY])
  const perPage = config?.results?.perPage!

  const [state, setState] = React.useState('idle') // loading > success | error
  const [data, setData] = React.useState<Photos>({
    photos: [],
    page: 0, // offset to start at page 1
    per_page: perPage,
    next_page: 1,
  })
  const [query, setQuery] = React.useState('')
  const debouncedQuery = useDebounce(query, config?.searchTimeout!)

  const loadMore = () => {
    setState('loading')

    const search = debouncedQuery
      ? client.photos.search({query: debouncedQuery, perPage, page: data?.page + 1})
      : client.photos.curated({perPage, page: data?.page + 1})

    return search
      .then((result) => {
        if ('error' in result) {
          setState('error')
          return
        }

        if (result.page > 1) {
          // eslint-disable-next-line consistent-return
          setData((prev) => ({
            ...prev,
            ...result,
            photos: [...prev.photos, ...result.photos],
          }))
        }

        setData(result)
      })
      .then(() => setState('success'))
      .catch(() => setState('error'))
  }

  // fetches curated photos
  React.useEffect(() => {
    setState('loading')
    loadMore()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // fetches photos based on query
  React.useEffect(() => {
    if (debouncedQuery) {
      setState('loading')
      loadMore()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    hasNextPage: !!data.next_page,
    error: state === 'error',
    loadMore,
  }
}
