import './App.css'
import Router from './Router'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import { themeSettings } from './theme'
import { useAppSelector } from './redux/store'
import { useMemo } from 'react'
import useSettings from './hooks/useSettings'
import { selectSettings } from './redux/slices/settings'
import useGetMe from './hooks/useGetMe'
import ErrorAlert from './components/ReduxAlert'

function App() {
  const { mode, font } = useAppSelector(selectSettings)

  useSettings()
  useGetMe()

  const theme = useMemo(() => themeSettings(mode, font), [mode, font])

  return (
    <div
      className="App"
      style={{ backgroundColor: theme.palette.background.default }}
    >
      <ThemeProvider theme={theme}>
        <Router />
        <ErrorAlert />
      </ThemeProvider>
    </div>
  )
}

export default App
