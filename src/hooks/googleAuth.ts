import { TokenResponse, useGoogleLogin } from '@react-oauth/google'
import { useGoogleAuthMutation } from '../api/authApiSlice'
import { useAppDispatch } from '../redux/store'
import setLocalValue from '../utils/setLocalBalue'
import { setUser } from '../redux/slices/user'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { showAlert } from '../redux/slices/alert'

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

  const [googleAuth] = useGoogleAuthMutation()

  const onSuccess = async (response: SuccessResponse) => {
    try {
      const data = await googleAuth(response.access_token).unwrap()

      dispatch(setUser(data))

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
