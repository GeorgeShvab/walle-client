import apiSlice from './apiSlice'
import { Document } from '../../types'

const documentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDocuments: builder.query<Document[], void | string>({
      query: (query) => ({
        url: '/documents' + (query ? '?' + query : ''),
      }),
    }),
  }),
})

export const { useGetDocumentsQuery } = documentApiSlice
