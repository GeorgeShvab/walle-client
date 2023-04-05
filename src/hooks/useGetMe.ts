import { useEffect } from 'react'
import { useAppDispatch } from '../redux/store'
import { useGetMeQuery } from '../api/userApiSlice'
import { authorize, unauthorize } from '../redux/slices/user'

const useGetMe = () => {
  const dispatch = useAppDispatch()

  const { data, error } = useGetMeQuery()

  useEffect(() => {
    if (data) {
      dispatch(authorize(data))
    } else if ((error as any)?.status === 401) {
      dispatch(unauthorize())
    }
  }, [data, error])
}

export default useGetMe
