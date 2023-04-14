import { useState } from 'react'
import {
  useRequestPasswordResetMutation,
  useResetPasswordMutation,
} from '../../api/authApiSlice'
import {
  FailedResponse,
  ResetPasswordBody,
  ValidationError,
} from '../../../types'
import { FormikHelpers } from 'formik'
import { useAppDispatch } from '../../redux/store'

interface Status {
  error: boolean
  success: boolean
  isLoading: boolean
}

export const useRequestPasswordReset = () => {
  const [status, setStatus] = useState<Status>({
    error: false,
    success: false,
    isLoading: false,
  })

  const [requestReset] = useRequestPasswordResetMutation()

  return [
    async (email: string) => {
      try {
        setStatus((prev) => ({ ...prev, isLoading: true }))

        if (!email) throw new Error('No email')

        const data = await requestReset(email).unwrap()

        setStatus({ error: false, success: true, isLoading: false })
      } catch (e) {
        setStatus({ error: true, success: false, isLoading: false })
      }
    },
    status,
  ] as const
}

export const useResetPassword = () => {
  const [status, setStatus] = useState<Status>({
    error: false,
    success: false,
    isLoading: false,
  })

  const [resetPassword] = useResetPasswordMutation()

  return [
    async (body: ResetPasswordBody) => {
      try {
        setStatus((prev) => ({ ...prev, isLoading: true }))

        const data = await resetPassword(body).unwrap()

        setStatus({ error: false, success: true, isLoading: false })
      } catch (e: any) {
        setStatus({ error: true, success: false, isLoading: false })

        return e as FailedResponse<ValidationError>
      }
    },
    status,
  ] as const
}
