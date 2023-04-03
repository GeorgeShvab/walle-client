import { useState } from 'react'
import {
  useCreateDocumentMutation,
  useDeleteDocumentMutation,
  useUpdateDocumentMutation,
  useUpdateDocumentTextMutation,
} from '../api/documentApiSlice'
import { showAlert } from '../redux/slices/alert'
import { useAppDispatch } from '../redux/store'
import {
  DocumentTextUpdationRequestBody,
  DocumentUpdationRequestBody,
  FailedResponse,
  ValidationError,
} from '../../types'
import { FormikHelpers } from 'formik'

interface Status {
  error: boolean
  success: boolean
  isLoading: boolean
}

export const useDeleteDocument = () => {
  const dispatch = useAppDispatch()

  const [status, setStatus] = useState<Status>({
    error: false,
    success: false,
    isLoading: false,
  })

  const [deleteDoc] = useDeleteDocumentMutation()

  return [
    async (id: string) => {
      try {
        setStatus({
          error: false,
          success: false,
          isLoading: true,
        })

        await deleteDoc(id).unwrap()

        setStatus({
          error: false,
          success: true,
          isLoading: false,
        })
      } catch (e: any) {
        if (e.status !== 500 && e.status !== 'FETCH_ERROR') {
          dispatch(showAlert('Помилка при видаленні документа'))
        }

        setStatus({
          error: true,
          success: false,
          isLoading: false,
        })
      }
    },
    status,
  ] as const
}

export const useUpdateDocument = () => {
  const dispatch = useAppDispatch()

  const [status, setStatus] = useState<Status>({
    error: false,
    success: false,
    isLoading: false,
  })

  const [updateDoc] = useUpdateDocumentMutation()

  return [
    async (body: DocumentUpdationRequestBody, actions?: FormikHelpers<any>) => {
      try {
        setStatus({
          error: false,
          success: false,
          isLoading: true,
        })

        await updateDoc(body).unwrap()

        setStatus({
          error: false,
          success: true,
          isLoading: false,
        })
      } catch (e: any) {
        if (e.status !== 500 && e.status !== 'FETCH_ERROR') {
          dispatch(showAlert('Помилка при оновленні документа'))
        }

        if (e.status === 400) {
          const errors = (e as FailedResponse<ValidationError>).data.errors

          actions && actions.setErrors(errors)
        }

        setStatus({
          error: true,
          success: false,
          isLoading: false,
        })
      }
    },
    status,
  ] as const
}

export const useUpdateDocumentText = () => {
  const dispatch = useAppDispatch()

  const [status, setStatus] = useState<Status>({
    error: false,
    success: false,
    isLoading: false,
  })

  const [updateDoc] = useUpdateDocumentTextMutation()

  return [
    async (body: DocumentTextUpdationRequestBody) => {
      try {
        setStatus({
          error: false,
          success: false,
          isLoading: true,
        })

        await updateDoc(body).unwrap()

        setStatus({
          error: false,
          success: true,
          isLoading: false,
        })
      } catch (e: any) {
        if (e.status !== 500 && e.status !== 'FETCH_ERROR') {
          dispatch(showAlert('Помилка при оновленні документа'))
        }

        if (e.status === 400) {
          const errors = (e as FailedResponse<ValidationError>).data.errors
        }

        setStatus({
          error: true,
          success: false,
          isLoading: false,
        })
      }
    },
    status,
  ] as const
}

export const useCreateDocument = () => {
  const dispatch = useAppDispatch()

  const [status, setStatus] = useState<Status>({
    error: false,
    success: false,
    isLoading: false,
  })

  const [createDoc] = useCreateDocumentMutation()

  return [
    async () => {
      try {
        setStatus({
          error: false,
          success: false,
          isLoading: true,
        })

        const data = await createDoc().unwrap()

        setStatus({
          error: false,
          success: true,
          isLoading: false,
        })

        return data
      } catch (e: any) {
        if (e.status !== 500 && e.status !== 'FETCH_ERROR') {
          dispatch(showAlert('Помилка при створенні документа'))
        }

        setStatus({
          error: true,
          success: false,
          isLoading: false,
        })
      }
    },
    status,
  ] as const
}
