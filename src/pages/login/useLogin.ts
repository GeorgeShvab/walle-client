import { useLoginMutation } from '../../api/authApiSlice'
import { LoginArgs } from '../../../types'
import { useNavigate, useLocation } from 'react-router-dom'
import { useLazyGetMeQuery } from '../../api/userApiSlice'
import asyncLocalStorageSet from '../../utils/asyncLocalStorageSet'
import apiSlice from '../../api/apiSlice'

const useLogin = () => {
  const [trigger] = useLazyGetMeQuery()

  const navigate = useNavigate()

  const location = useLocation()

  const [login] = useLoginMutation()

  const redirectUrl = /documents/.test(location?.state?.referrer)
    ? location?.state?.referrer
    : '/home'

  return async (args: LoginArgs) => {
    try {
      const data = await login(args).unwrap()

      apiSlice.util.invalidateTags(['Document', 'Documents'])

      await Promise.all([
        (asyncLocalStorageSet('AccessToken', data.accessToken),
        asyncLocalStorageSet('RefreshToken', data.refreshToken)),
      ])

      await trigger()

      navigate(redirectUrl)
    } catch (e: any) {
      if (e.status === 404) {
        return {
          email: 'Невірний емейл або пароль',
          password: 'Невірний емейл або пароль',
        }
      }
    }
  }
}

export default useLogin
