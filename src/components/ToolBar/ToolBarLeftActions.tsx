import { FC } from 'react'
import IconButton from '@mui/material/IconButton'
import HomeIcon from '@mui/icons-material/Home'
import SettingsIcon from '@mui/icons-material/Settings'
import ActionsBarWrapper from './ActionsBarWrapper'
import { Link } from 'react-router-dom'
import { SxProps } from '@mui/material/styles'

const ToolBarLeftActions: FC<{ sx?: SxProps }> = ({ sx }) => {
  return (
    <ActionsBarWrapper sx={sx}>
      <>
        <Link to="/home">
          <IconButton size="small">
            <HomeIcon />
          </IconButton>
        </Link>
        <IconButton size="small">
          <SettingsIcon />
        </IconButton>
      </>
    </ActionsBarWrapper>
  )
}

export default ToolBarLeftActions
