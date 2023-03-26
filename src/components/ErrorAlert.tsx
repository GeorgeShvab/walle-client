import { useEffect, useState } from 'react'
import { hideError, selectError } from '../redux/slices/error'
import { useAppDispatch, useAppSelector } from '../redux/store'
import Alert from './Alert'

const ErrorAlert = () => {
  const dispatch = useAppDispatch()

  const error = useAppSelector(selectError)

  const [time, setTime] = useState<number>()

  useEffect(() => {
    if (error.state) {
      clearTimeout(time)
      setTime(
        setTimeout(() => {
          dispatch(hideError())
        }, 7500)
      )
    }
  }, [error])

  return <Alert open={error.state} text={error.text} type="error" />
}

export default ErrorAlert
