import { useState, useEffect } from 'react'
import { useVerifyMutation } from '../../api/authApiSlice'
import { useLazyGetMeQuery } from '../../api/userApiSlice'
import asyncLocalStorageSet from '../../utils/asyncLocalStorageSet'
import apiSlice from '../../api/apiSlice'

const useVerification = (token: string | null) => {
  const [verify] = useVerifyMutation()

  const [trigger] = useLazyGetMeQuery()

  const [error, setError] = useState<string>()

  const [success, setSuccess] = useState<boolean>()

  useEffect(() => {
    if (!token) {
      setError('Токен верифікації не знайдено')
    } else {
      ;(async () => {
        try {
          const data = await verify(token).unwrap()

          apiSlice.util.invalidateTags(['Document', 'Documents'])

          await Promise.all([
            (asyncLocalStorageSet('AccessToken', data.accessToken),
            asyncLocalStorageSet('RefreshToken', data.refreshToken)),
          ])

          await trigger()

          setError(undefined)

          setSuccess(true)
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
