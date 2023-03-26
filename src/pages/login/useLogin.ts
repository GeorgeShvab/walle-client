import { useState } from 'react'
import { useLoginMutation } from '../../api/authApiSlice'
import { useAppDispatch } from '../../redux/store'
import { LoginArgs } from '../../../types'
import { setUser } from '../../redux/slices/user'
import { useNavigate } from 'react-router-dom'

const useLogin = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const [login] = useLoginMutation()

  return async (args: LoginArgs) => {
    try {
      const data = await login(args).unwrap()

      dispatch(setUser(data))

      navigate('/home')
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
