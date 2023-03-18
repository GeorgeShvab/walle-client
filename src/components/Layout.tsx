import Box from '@mui/material/Box'
import { FC, ReactElement } from 'react'
import ToolBar from './ToolBar/ToolBar'

const Layout: FC<{ children: ReactElement }> = ({ children }) => {
  return (
    <Box>
      <ToolBar />
      {children}
    </Box>
  )
}

export default Layout
