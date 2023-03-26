import { useState } from 'react'
import {
  FailedResponse,
  PasswordUpdationArgs,
  ValidationError,
} from '../../../types'
import { FormikHelpers } from 'formik'
import { useUpdatePasswordMutation } from '../../api/userApiSlice'
import { SettingsRequestBody } from '../../../types'
import { useUpdateSettingsMutation } from '../../api/userApiSlice'
import { useAppDispatch } from '../../redux/store'
import { showAlert } from '../../redux/slices/alert'

export const useUpdatePassword = () => {
  const dispatch = useAppDispatch()

  const [updatePassword] = useUpdatePasswordMutation()

  return async (
    args: PasswordUpdationArgs,
    actions: FormikHelpers<PasswordUpdationArgs>
  ) => {
    try {
      await updatePassword(args).unwrap()

      dispatch(showAlert({ text: 'Пароль змінено', type: 'success' }))
    } catch (e: any) {
      if (e.status === 400) {
        const errors = (e as FailedResponse<ValidationError>).data.errors

        actions.setErrors(errors)
      }
    }
  }
}

export const useUpdateSettings = () => {
  const [updateSettings] = useUpdateSettingsMutation()

  return async (args: SettingsRequestBody) => {
    try {
      await updateSettings(args).unwrap()
    } catch (e) {}
  }
}
