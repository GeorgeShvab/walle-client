import { TokenResponse, useGoogleLogin } from '@react-oauth/google'
import { useGoogleAuthMutation } from '../api/authApiSlice'
import { useAppDispatch } from '../redux/store'
import { useNavigate } from 'react-router-dom'
import { showAlert } from '../redux/slices/alert'
import { useLazyGetMeQuery } from '../api/userApiSlice'
import asyncLocalStorageSet from '../utils/asyncLocalStorageSet'
import apiSlice from '../api/apiSlice'

type SuccessResponse = Omit<
  TokenResponse,
  'error' | 'error_description' | 'error_uri'
>

type ErrorResponse = Pick<
  TokenResponse,
  'error' | 'error_description' | 'error_uri'
>

const useGoogleAuthorization = () => {
  const dispatch = useAppDispatch()

  const [trigger] = useLazyGetMeQuery()

  const navigate = useNavigate()

  const [googleAuth] = useGoogleAuthMutation()

  const onSuccess = async (response: SuccessResponse) => {
    try {
      const data = await googleAuth(response.access_token).unwrap()

      apiSlice.util.invalidateTags(['Document', 'Documents'])

      await Promise.all([
        (asyncLocalStorageSet('AccessToken', data.accessToken),
        asyncLocalStorageSet('RefreshToken', data.refreshToken)),
      ])

      await trigger()

      navigate('/home')
    } catch (e) {
      dispatch(showAlert('Помилка авторизації'))
    }
  }

  const onError = (response: ErrorResponse) => {
    dispatch(showAlert('Помилка авторизації'))
  }

  return useGoogleLogin({
    onSuccess,
    onError,
  })
}

export default useGoogleAuthorization
