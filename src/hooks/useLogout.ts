import { useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../api/authApiSlice'
import { useAppDispatch } from '../redux/store'
import { showAlert } from '../redux/slices/alert'
import { unauthorize } from '../redux/slices/user'

const useLogout = () => {
  const dispatch = useAppDispatch()

  const [logout] = useLogoutMutation()

  const navigate = useNavigate()

  return async () => {
    try {
      await logout().unwrap()

      dispatch(unauthorize())

      navigate('/login')
    } catch (e: any) {
      dispatch(showAlert('Помилка при виході'))
    }
  }
}

export default useLogout
