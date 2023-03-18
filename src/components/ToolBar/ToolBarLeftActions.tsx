import Box from '@mui/material/Box'
import { FC } from 'react'
import IconButton from '@mui/material/IconButton'
import HomeIcon from '@mui/icons-material/Home'
import SettingsIcon from '@mui/icons-material/Settings'
import usePage from '../../hooks/usePage'
import UndoIcon from '@mui/icons-material/Undo'
import RedoIcon from '@mui/icons-material/Redo'

const ToolBarLeftActions: FC = () => {
  const { page } = usePage()

  if (page === 'document') {
    return (
      <Box padding="5px 10px" display="flex" gap="0px">
        <IconButton size="small">
          <HomeIcon />
        </IconButton>
        <IconButton size="small">
          <SettingsIcon />
        </IconButton>
        <IconButton size="small">
          <UndoIcon />
        </IconButton>
        <IconButton size="small">
          <RedoIcon />
        </IconButton>
      </Box>
    )
  }

  return (
    <Box padding="5px 10px" display="flex" gap="0px">
      <IconButton size="small">
        <HomeIcon />
      </IconButton>
      <IconButton size="small">
        <SettingsIcon />
      </IconButton>
    </Box>
  )
}

export default ToolBarLeftActions
