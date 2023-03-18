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

  const [error, setError] = useState<string>()

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

  return [
    async (args: LoginArgs) => {
      try {
        const data = await login(args).unwrap()

        setError(undefined)
        dispatch(setUser(data))

        navigate('/home')
      } catch (e: any) {
        if (e.status === 404) {
          return {
            email: 'Невірний емейл або пароль',
            password: 'Невірний емейл або пароль',
          }
        } else if (e.status === 500) {
          clearTime()
          setError('Помилка серверу')
        } else {
          clearTime()
          setError("Помилка з'єднання")
        }
      }
    },
    error,
  ] as const
}

export default useLogin
