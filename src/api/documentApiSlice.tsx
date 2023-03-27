import apiSlice from './apiSlice'
import { AccessType, Document, DocumentUpdationRequestBody } from '../../types'

const documentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDocuments: builder.query<Document[], void | string>({
      query: (query) => ({
        url: '/documents' + (query ? '?' + query : ''),
      }),
      providesTags: ['Documents'],
    }),
    deleteDocument: builder.mutation<void, string>({
      query: (id) => ({
        url: '/document/' + id,
        method: 'DELETE',
      }),
      invalidatesTags: ['Documents'],
    }),
    updateDocument: builder.mutation<void, DocumentUpdationRequestBody>({
      query: (body) => ({
        url: '/document/' + body.id,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Documents'],
    }),
  }),
})

export const {
  useGetDocumentsQuery,
  useDeleteDocumentMutation,
  useUpdateDocumentMutation,
} = documentApiSlice
