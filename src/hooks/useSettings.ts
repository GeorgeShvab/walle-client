import { useEffect } from 'react'
import { useAppDispatch } from '../redux/store'
import { setSettings } from '../redux/slices/settings'
import { useGetMeQuery } from '../api/userApiSlice'

const useSettings = () => {
  const dispatch = useAppDispatch()

  const { data } = useGetMeQuery()

  useEffect(() => {
    if (data) {
      dispatch(
        setSettings({
          mode: data.mode,
          font: data.font,
          color: data.color,
        })
      )
    }
  }, [data])
}

export default useSettings
