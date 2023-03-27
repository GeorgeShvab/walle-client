import Box from '@mui/material/Box'
import { FC, ReactElement } from 'react'
import ToolBar from './ToolBar/ToolBar'

const Layout: FC<{ children: ReactElement }> = ({ children }) => {
  return (
    <Box>
      <ToolBar />
      <Box minHeight="calc(100vh - 42px)">{children}</Box>
    </Box>
  )
}

export default Layout
