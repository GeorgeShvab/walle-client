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
import useMode from './hooks/useMode'
import Box from '@mui/material/Box'
import { useMediaQuery } from '@mui/material'
import useTabs from './hooks/useTabs'

function App() {
  const { mode, font } = useAppSelector(selectSettings)

  useSettings()
  useGetMe()
  useMode()
  useTabs()

  const theme = useMemo(() => themeSettings(mode, font), [mode, font])

  const isLesserThanMd = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <div
      className="App"
      style={{
        backgroundColor: theme.palette.background.default,
        height: '100vh',
      }}
    >
      <Box
        height={'100vh'}
        overflow="auto"
        sx={{
          '&::-webkit-scrollbar': {
            width: isLesserThanMd ? undefined : '10px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor:
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : '#0e0e0e',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor:
              theme.palette.mode === 'light'
                ? theme.palette.grey[300]
                : theme.palette.background.light,
          },
        }}
      >
        <ThemeProvider theme={theme}>
          <Router />
          <ErrorAlert />
        </ThemeProvider>
      </Box>
    </div>
  )
}

export default App
