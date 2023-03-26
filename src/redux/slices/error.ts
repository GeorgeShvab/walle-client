import { Action, createSlice } from '@reduxjs/toolkit'

interface ErrorState {
  text: string | undefined
  type: 'success' | 'error' | undefined
  state: boolean
}

const initialState: ErrorState = {
  text: undefined,
  type: undefined,
  state: false,
}

interface SetErrorAction extends Action {
  payload: string
}

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    showError: (state, action: SetErrorAction) => {
      return { text: action.payload, state: true, type: 'error' }
    },
    hideError: (state) => {
      return { ...state, state: false }
    },
  },
})

export default errorSlice.reducer

export const { showError, hideError } = errorSlice.actions

export const selectError = ({ error }: { error: ErrorState }) => error
