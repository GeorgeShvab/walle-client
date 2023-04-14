import { FC, ReactElement } from 'react'
import { Navigate } from 'react-router-dom'
import { useGetMeQuery } from '../api/userApiSlice'

const ProtectRoute: FC<{
  children: ReactElement
  protectFromAuthorized?: boolean
}> = ({ children, protectFromAuthorized = false }) => {
  const { data, isLoading, error } = useGetMeQuery()

  if (
    (!isLoading && !data && !protectFromAuthorized) ||
    (!protectFromAuthorized && (error as any)?.status === 401)
  ) {
    return <Navigate to="/login" />
  } else if (!isLoading && data && protectFromAuthorized) {
    return <Navigate to="/home" />
  }

  return children
}

export default ProtectRoute
