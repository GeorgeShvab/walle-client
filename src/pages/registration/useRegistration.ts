import { useState } from 'react'
import { useRegistrationMutation } from '../../api/authApiSlice'
import { useAppDispatch } from '../../redux/store'
import {
  FailedResponse,
  RegistrationArgs,
  ValidationError,
} from '../../../types'
import { setUser } from '../../redux/slices/user'
import { useNavigate } from 'react-router-dom'

const useRegistration = () => {
  const navigate = useNavigate()

  const [register] = useRegistrationMutation()

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
    async (args: RegistrationArgs) => {
      try {
        const data = await register(args).unwrap()

        setError(undefined)

        navigate('/registration/success')
      } catch (e: any) {
        console.log(e)
        if (e.status === 400) {
          return (e as FailedResponse<ValidationError>).data.errors
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

export default useRegistration
