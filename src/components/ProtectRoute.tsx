import { FC, ReactElement } from 'react'
import { useAppSelector } from '../redux/store'
import { selectUser } from '../redux/slices/user'
import { Navigate } from 'react-router-dom'

const ProtectRoute: FC<{
  children: ReactElement
  protectFromAuthorized?: boolean
}> = ({ children, protectFromAuthorized = false }) => {
  const user = useAppSelector(selectUser)

  if (!user.isLoading && !user.data && !protectFromAuthorized) {
    return <Navigate to="/login" />
  } else if (!user.isLoading && user.data && protectFromAuthorized) {
    return <Navigate to="/home" />
  }

  return children
}

export default ProtectRoute
