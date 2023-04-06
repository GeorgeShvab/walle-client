import { useEffect } from 'react'
import { useAppDispatch } from '../redux/store'
import { useLazyGetMeQuery } from '../api/userApiSlice'
import { authorize, unauthorize } from '../redux/slices/user'
import getLocalValue from '../utils/getLocalValue'

const useGetMe = () => {
  const dispatch = useAppDispatch()

  const [trigger, { data, error }] = useLazyGetMeQuery()

  useEffect(() => {
    const accessToken = getLocalValue('AccessToken')

    if (accessToken) {
      trigger()
    } else {
      dispatch(unauthorize())
    }

    if (data) {
      dispatch(authorize(data))
    } else if ((error as any)?.status === 401) {
      dispatch(unauthorize())
    }
  }, [data, error])
}

export default useGetMe
