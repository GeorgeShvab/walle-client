import apiSlice from './apiSlice'
import {
  Document,
  DocumentTextUpdationRequestBody,
  DocumentUpdationRequestBody,
} from '../../types'

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
    getDocument: builder.query<Document, string>({
      query: (id) => ({
        url: '/document/' + id,
      }),
    }),
    updateDocumentText: builder.mutation<void, DocumentTextUpdationRequestBody>(
      {
        query: (body) => ({
          url: '/document/' + body.id,
          method: 'PATCH',
          body,
        }),
      }
    ),
    createDocument: builder.mutation<Document, void>({
      query: () => ({
        url: '/document',
        method: 'POST',
      }),
    }),
  }),
})

export const {
  useGetDocumentsQuery,
  useDeleteDocumentMutation,
  useUpdateDocumentMutation,
  useGetDocumentQuery,
  useUpdateDocumentTextMutation,
  useCreateDocumentMutation,
  useLazyGetDocumentQuery,
} = documentApiSlice
