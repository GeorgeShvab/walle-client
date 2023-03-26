import { Action, createSlice } from '@reduxjs/toolkit'

interface AlertState {
  text: string | undefined
  type: 'success' | 'error' | undefined
  state: boolean
}

const initialState: AlertState = {
  text: undefined,
  type: undefined,
  state: false,
}

interface SetAlertAction extends Action {
  payload: { text: string; type?: 'success' | 'error' } | string
}

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action: SetAlertAction) => {
      if (typeof action.payload === 'string') {
        return { text: action.payload, state: true, type: 'error' }
      } else {
        return { state: true, type: 'error', ...action.payload }
      }
    },
    hideAlert: (state) => {
      return { ...state, state: false }
    },
  },
})

export default alertSlice.reducer

export const { showAlert, hideAlert } = alertSlice.actions

export const selectAlert = ({ alert }: { alert: AlertState }) => alert
