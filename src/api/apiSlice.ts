import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react'
import getLocalValue from '../utils/getLocalValue'

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_SERVER_ADDRESS,
  prepareHeaders: (headers) => {
    headers.set('authorization', getLocalValue('authorization'))
    return headers
  },
})

const apiSlice = createApi({
  baseQuery,
  endpoints: () => ({}),
})

export default apiSlice
