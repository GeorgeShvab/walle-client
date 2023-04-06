import { Action, createSlice } from '@reduxjs/toolkit'
import { AuthResponse, User } from '../../../types'
import setLocalValue from '../../utils/setLocalBalue'

interface UserState {
  data: User | null
  isLoading: boolean
}

interface SetUserAction extends Action {
  payload: AuthResponse
}

const initialState: UserState = {
  data: null,
  isLoading: true,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: SetUserAction) => {
      setLocalValue('AccessToken', action.payload.accessToken)
      setLocalValue('RefreshToken', action.payload.refreshToken)

      state.data = action.payload.user
      state.isLoading = false
    },
    authorize: (state, action: { payload: User }) => {
      state.data = action.payload
      state.isLoading = false

      setLocalValue('user_id', action.payload.id)
    },
    unauthorize: (state) => {
      state.data = null
      state.isLoading = false

      window.localStorage.clear()
      window.localStorage.removeItem('persist:root')
    },
  },
})

export default userSlice.reducer

export const { setUser, unauthorize, authorize } = userSlice.actions

export const selectUser = ({ user }: { user: UserState }) => user
