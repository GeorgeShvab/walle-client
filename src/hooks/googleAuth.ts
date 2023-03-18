import { TokenResponse, useGoogleLogin } from '@react-oauth/google'
import { useGoogleAuthMutation } from '../api/authApiSlice'
import { useAppDispatch } from '../redux/store'
import setLocalValue from '../utils/setLocalBalue'
import { setUser } from '../redux/slices/user'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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

  const navigate = useNavigate()

  const [error, setError] = useState<string>()

  const [googleAuth] = useGoogleAuthMutation()

  const [time, setTime] = useState<number>()

  // Function to clear error after some time
  const clearTime = () => {
    clearTimeout(time)
    setTime(
      setTimeout(() => {
        setError(undefined)
      }, 5000)
    )
  }

  const onSuccess = async (response: SuccessResponse) => {
    try {
      const data = await googleAuth(response.access_token).unwrap()

      setError(undefined)
      dispatch(setUser(data))

      navigate('/home')
    } catch (e) {
      clearTime()
      setError('Помилка авторизації')
    }
  }

  const onError = (response: ErrorResponse) => {
    clearTime()
    setError('Помилка авторизації')
  }

  return [
    useGoogleLogin({
      onSuccess,
      onError,
    }),
    error,
  ] as const
}

export default useGoogleAuthorization
