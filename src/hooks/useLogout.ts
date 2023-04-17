import { useLogoutMutation } from '../api/authApiSlice'
import { useAppDispatch } from '../redux/store'
import clearStorage from '../utils/clearStorage'

const useLogout = () => {
  const dispatch = useAppDispatch()

  const [logout, data] = useLogoutMutation()

  return [
    async () => {
      try {
        await logout().unwrap()
      } catch (e: any) {
        //dispatch(showAlert('Помилка при виході'))
      } finally {
        dispatch({ type: 'RESET' })

        await clearStorage()

        window.location.pathname = '/login'
      }
    },
    data,
  ] as const
}

export default useLogout
