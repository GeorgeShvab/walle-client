import './App.css'
import Router from './Router'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import { themeSettings } from './theme'

function App() {
  const theme = themeSettings('light', 'Rubik')

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </div>
  )
}

export default App
