import { FC, useState } from 'react'
import IconButton from '@mui/material/IconButton'
import HomeIcon from '@mui/icons-material/Home'
import SettingsIcon from '@mui/icons-material/Settings'
import ActionsBarWrapper from './ActionsBarWrapper'
import { Link } from 'react-router-dom'
import { SxProps } from '@mui/material/styles'
import Settings from '../Settings/Settings'

const ToolBarLeftActions: FC<{ sx?: SxProps }> = ({ sx }) => {
  const [settinsgOpen, setSettingsOpen] = useState<boolean>(false)

  const toggleSettings = () => {
    setSettingsOpen((prev) => !prev)
  }

  return (
    <ActionsBarWrapper sx={sx}>
      <>
        <Link to="/home">
          <IconButton size="small">
            <HomeIcon />
          </IconButton>
        </Link>
        <IconButton size="small" onClick={toggleSettings}>
          <SettingsIcon />
        </IconButton>
        <Settings open={settinsgOpen} onClose={toggleSettings} />
      </>
    </ActionsBarWrapper>
  )
}

export default ToolBarLeftActions
