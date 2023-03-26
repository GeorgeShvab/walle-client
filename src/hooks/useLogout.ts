import { useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../api/authApiSlice'

const useLogout = () => {
  const [logout] = useLogoutMutation()

  const navigate = useNavigate()

  return async () => {
    try {
      await logout().unwrap()

      navigate('/login')
    } catch (e) {}
  }
}

export default useLogout
