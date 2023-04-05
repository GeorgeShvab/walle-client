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
      invalidatesTags: (result, error, args) => {
        // I think no sense to update all docs if only type or access were changed
        return args.title || args.type
          ? ['Documents', { id: args.id, type: 'Document' }]
          : [{ id: args.id, type: 'Document' }]
      },
    }),
    getDocument: builder.query<Document, string>({
      query: (id) => ({
        url: '/document/' + id,
      }),
      providesTags: (result, error, arg) => [{ id: arg, type: 'Document' }],
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
