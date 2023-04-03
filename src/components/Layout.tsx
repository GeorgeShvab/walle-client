import Box from '@mui/material/Box'
import { FC, ReactElement } from 'react'
import ToolBar from './ToolBar/ToolBar'

const Layout: FC<{ children: ReactElement }> = ({ children }) => {
  return (
    <Box>
      <ToolBar />
      <Box minHeight="var(--screenHeight)">{children}</Box>
    </Box>
  )
}

export default Layout
