import { useEffect, useState } from 'react'
import { useAppDispatch } from '../redux/store'
import { useGetMeQuery } from '../api/userApiSlice'
import getLocalValue from '../utils/getLocalValue'

const useGetMe = () => {
  const [refreshToken, setRefreshToken] = useState<string | undefined>(
    getLocalValue('RefreshToken')
  )

  const { data, refetch } = useGetMeQuery()

  const handleStorageChange = () => {
    const token = getLocalValue('RefreshToken')

    if (token && token !== refreshToken && !data) {
      setRefreshToken(token)

      refetch()
    }
  }

  useEffect(() => {
    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])
}

export default useGetMe
