import Box from '@mui/material/Box'
import { FC } from 'react'
import IconButton from '@mui/material/IconButton'
import HomeIcon from '@mui/icons-material/Home'
import SettingsIcon from '@mui/icons-material/Settings'

const ToolBar: FC = () => {
  return (
    <Box>
      <Box padding="5px 10px" display="flex" gap="0px">
        <IconButton size="small">
          <HomeIcon />
        </IconButton>
        <IconButton size="small">
          <SettingsIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default ToolBar
