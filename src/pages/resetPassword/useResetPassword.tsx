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
import { showAlert } from '../../redux/slices/alert'

interface RequestPasswordReset {
  email: string
}

export const useRequestPasswordReset = () => {
  const [requestReset, data] = useRequestPasswordResetMutation()

  return [
    async (
      values: RequestPasswordReset,
      actions: FormikHelpers<RequestPasswordReset>
    ) => {
      try {
        if (!values.email) actions.setErrors({ email: 'Вкажіть Ваш емейл' })

        await requestReset(values.email).unwrap()
      } catch (e) {}
    },
    data,
  ] as const
}

export const useResetPassword = () => {
  const [resetPassword, data] = useResetPasswordMutation()

  return [
    async (
      body: { verificationToken?: string; password: string },
      actions: FormikHelpers<{ password: string }>
    ) => {
      try {
        if (!body.password) {
          actions.setErrors({ password: 'Введіть новий пароль' })
          return
        }

        await resetPassword(body as ResetPasswordBody).unwrap()
      } catch (e: any) {
        if (e.status === 400 && e.data.errors) {
          actions.setErrors((e as FailedResponse<ValidationError>).data.errors)
        }
      }
    },
    data,
  ] as const
}
