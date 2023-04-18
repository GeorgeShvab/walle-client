import {
  useCreateDocumentMutation,
  useDeleteDocumentMutation,
  useUpdateDocumentMutation,
  useUpdateDocumentTextMutation,
} from '../api/documentApiSlice'
import { showAlert } from '../redux/slices/alert'
import { useAppDispatch } from '../redux/store'
import {
  Document,
  DocumentTextUpdationRequestBody,
  DocumentUpdationRequestBody,
  FailedResponse,
  ValidationError,
} from '../../types'
import { FormikHelpers } from 'formik'
import usePage from './usePage'
import { closeTab } from '../redux/slices/tabs'
import { useNavigate } from 'react-router-dom'
import { EditorState, RawDraftContentState, convertFromRaw } from 'draft-js'

export const useDeleteDocument = () => {
  const dispatch = useAppDispatch()

  const { id: docId } = usePage()

  const navigate = useNavigate()

  const [deleteDoc, data] = useDeleteDocumentMutation()

  return [
    async (id: string) => {
      try {
        await deleteDoc(id).unwrap()

        dispatch(showAlert({ text: 'Документ видалено', type: 'success' }))

        if (id === docId) {
          navigate('/home')
        }

        dispatch(closeTab(id))
      } catch (e: any) {
        if (e.status !== 500 && e.status !== 'FETCH_ERROR') {
          dispatch(showAlert('Помилка при видаленні документа'))
        }
      }
    },
    data,
  ] as const
}

export const useUpdateDocument = () => {
  const dispatch = useAppDispatch()

  const [updateDoc, data] = useUpdateDocumentMutation()

  return [
    async (body: DocumentUpdationRequestBody, actions?: FormikHelpers<any>) => {
      try {
        await updateDoc(body).unwrap()

        dispatch(showAlert({ text: 'Документ оновлено', type: 'success' }))
      } catch (e: any) {
        if (e.status !== 500 && e.status !== 'FETCH_ERROR') {
          dispatch(showAlert('Помилка при оновленні документа'))
        }

        if (e.status === 400) {
          const errors = (e as FailedResponse<ValidationError>).data.errors

          actions && actions.setErrors(errors)
        }
      }
    },
    data,
  ] as const
}

export const useUpdateDocumentText = () => {
  const dispatch = useAppDispatch()

  const [updateDoc, data] = useUpdateDocumentTextMutation()

  return [
    async (body: DocumentTextUpdationRequestBody) => {
      try {
        await updateDoc(body).unwrap()
      } catch (e: any) {
        if (e.status !== 500 && e.status !== 'FETCH_ERROR') {
          dispatch(showAlert('Помилка при оновленні документа'))
        }

        if (e.status === 400) {
          const errors = (e as FailedResponse<ValidationError>).data.errors
        }
      }
    },
    data,
  ] as const
}

export const useCreateDocument = () => {
  const dispatch = useAppDispatch()

  const [createDoc, data] = useCreateDocumentMutation()

  return [
    async () => {
      try {
        const data = await createDoc().unwrap()

        return data
      } catch (e: any) {
        if (e.status !== 500 && e.status !== 'FETCH_ERROR') {
          dispatch(showAlert('Помилка при створенні документа'))
        }
      }
    },
    data,
  ] as const
}

export const useDownload = (doc: Document | undefined) => {
  const dispatch = useAppDispatch()

  return async () => {
    if (!doc) return

    try {
      const rawText = EditorState.createWithContent(
        convertFromRaw(JSON.parse(doc.text) as RawDraftContentState)
      )
        .getCurrentContent()
        .getPlainText()

      const url = `data:text/${doc.type};base64,${btoa(
        unescape(encodeURIComponent(rawText))
      )}`
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = `${doc.title}.${doc.type}`
      document.body.appendChild(a)
      a.click()
      a.remove()
    } catch (e) {
      dispatch(showAlert('Помилка при завантаженні файлу'))
    }
  }
}

export const useCopyDocumentLink = (id: string) => {
  const dispatch = useAppDispatch()

  return () => {
    try {
      navigator.clipboard.writeText(document.location.href)
      dispatch(showAlert({ text: 'Посилання скопійовано', type: 'success' }))
    } catch (e) {}
  }
}
