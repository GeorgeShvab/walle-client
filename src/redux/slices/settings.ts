import { Action, createSlice } from '@reduxjs/toolkit'
import { Font, Mode } from '../../../types'

interface SettingsState {
  mode: Mode
  font: Font
  color: string
}

const initialState: SettingsState = {
  mode: 'light',
  font: 'Rubik',
  color: '#121212',
}

interface SetSettingsAction extends Action {
  payload: { mode?: Mode; font?: Font; color?: string }
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
    },
    setSettings: (state, action: SetSettingsAction) => {
      return { ...state, ...action.payload }
    },
  },
})

export default settingsSlice.reducer

export const { toggleMode, setSettings } = settingsSlice.actions

export const selectSettings = ({ settings }: { settings: SettingsState }) =>
  settings
