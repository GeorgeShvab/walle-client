import { useEffect, useState } from 'react'
import { hideAlert, selectAlert } from '../redux/slices/alert'
import { useAppDispatch, useAppSelector } from '../redux/store'
import Alert from './Alert'

const ReduxAlert = () => {
  const dispatch = useAppDispatch()

  const alert = useAppSelector(selectAlert)

  const [time, setTime] = useState<number>()

  useEffect(() => {
    if (alert.state) {
      clearTimeout(time)
      setTime(
        setTimeout(() => {
          dispatch(hideAlert())
        }, 7500)
      )
    }
  }, [alert])

  return <Alert open={alert.state} text={alert.text} type={alert.type} />
}

export default ReduxAlert
