import { useState, useEffect } from 'react'
import { useVerifyMutation } from '../../api/authApiSlice'
import { setUser } from '../../redux/slices/user'
import { useAppDispatch } from '../../redux/store'

const useVerification = (token: string | null) => {
  const dispatch = useAppDispatch()

  const [verify] = useVerifyMutation()

  const [error, setError] = useState<string>()

  const [success, setSuccess] = useState<boolean>()

  useEffect(() => {
    if (!token) {
      setError('Токен верифікації не знайдено')
    } else {
      ;(async () => {
        try {
          const data = await verify(token).unwrap()

          setError(undefined)

          setSuccess(true)

          dispatch(setUser(data))
        } catch (e: any) {
          if (e.status === 400) {
            setError('Час дії токену вичерпався або токен невірний')
          } else if (e.status === 500) {
            setError('Помилка серверу ')
          } else {
            setError("Помилка з'єднання")
          }
        }
      })()
    }
  }, [token])

  return [error, success] as const
}

export default useVerification
