import { FC, ReactElement } from 'react'
import useTheme from '@mui/material/styles/useTheme'
import Box from '@mui/material/Box'
import Header from './Header'

const CenterContentPageWrapper: FC<{ children: ReactElement }> = ({
  children,
}) => {
  const { palette } = useTheme()

  return (
    <Box
      component="main"
      minHeight="100vh"
      sx={{
        backgroundColor:
          palette.mode === 'light'
            ? palette.grey[50]
            : palette.background.default,
      }}
    >
      <Box className="container">
        <Header link />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="calc(100vh - 72px)"
        >
          <Box sx={{ transform: 'translateY(-36px)' }}>{children}</Box>
        </Box>
      </Box>
    </Box>
  )
}

export default CenterContentPageWrapper
