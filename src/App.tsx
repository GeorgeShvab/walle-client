import './App.css'
import Router from './Router'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import { themeSettings } from './theme'
import { useAppSelector } from './redux/store'
import { selectMode } from './redux/slices/mode'
import { useMemo } from 'react'

function App() {
  const mode = useAppSelector(selectMode)

  const theme = useMemo(() => themeSettings('light', 'Rubik'), [mode])

  return (
    <div
      className="App"
      style={{ backgroundColor: theme.palette.background.default }}
    >
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </div>
  )
}

export default App
