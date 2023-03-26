import { useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../api/authApiSlice'
import { useAppDispatch } from '../redux/store'
import { showAlert } from '../redux/slices/alert'

const useLogout = () => {
  const dispatch = useAppDispatch()

  const [logout] = useLogoutMutation()

  const navigate = useNavigate()

  return async () => {
    try {
      await logout().unwrap()

      navigate('/login')
    } catch (e) {
      dispatch(showAlert('Помилка при виході'))
    }
  }
}

export default useLogout
