import { useLoginMutation } from '../../api/authApiSlice'
import { LoginArgs } from '../../../types'
import { useNavigate, useLocation } from 'react-router-dom'
import { useLazyGetMeQuery } from '../../api/userApiSlice'
import asyncLocalStorageSet from '../../utils/asyncLocalStorageSet'
import { FormikHelpers } from 'formik'

const useLogin = () => {
  const [trigger] = useLazyGetMeQuery()

  const navigate = useNavigate()

  const location = useLocation()

  const [login, data] = useLoginMutation()

  const redirectUrl = /documents/.test(location?.state?.referrer)
    ? location?.state?.referrer
    : '/home'

  return [
    async (values: LoginArgs, actions: FormikHelpers<LoginArgs>) => {
      try {
        const data = await login(values).unwrap()

        await Promise.all([
          (asyncLocalStorageSet('AccessToken', data.accessToken),
          asyncLocalStorageSet('RefreshToken', data.refreshToken)),
        ])

        await trigger()

        navigate(redirectUrl)
      } catch (e: any) {
        if (e.status === 404) {
          actions.setErrors({
            email: 'Невірний емейл або пароль',
            password: 'Невірний емейл або пароль',
          })
        }
      }
    },
    data,
  ] as const
}

export default useLogin
