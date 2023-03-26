import { useEffect } from 'react'
import { useAppDispatch } from '../redux/store'
import { useGetMeQuery } from '../api/userApiSlice'
import { authorize } from '../redux/slices/user'

const useGetMe = () => {
  const dispatch = useAppDispatch()

  const { data } = useGetMeQuery()

  useEffect(() => {
    if (data) {
      dispatch(authorize(data))
    }
  }, [data])
}

export default useGetMe
