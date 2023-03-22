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
    unauthorize: (state) => {
      state.data = null
      state.isLoading = true
    },
  },
})

export default userSlice.reducer

export const { setUser, unauthorize } = userSlice.actions
