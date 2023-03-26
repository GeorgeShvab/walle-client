import { useEffect } from 'react'
import { selectUser } from '../redux/slices/user'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { setSettings } from '../redux/slices/settings'

const useSettings = () => {
  const dispatch = useAppDispatch()

  const user = useAppSelector(selectUser)

  useEffect(() => {
    if (user.data) {
      dispatch(
        setSettings({
          mode: user.data.mode,
          font: user.data.font,
          color: user.data.color,
        })
      )
    }
  }, [user.data])
}

export default useSettings
