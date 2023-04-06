import { FC } from 'react'
import { SettingsSection, User } from '../../../types'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import TuneIcon from '@mui/icons-material/Tune'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import InfoIcon from '@mui/icons-material/Info'

interface PropsType {
  section: SettingsSection
  onClick: (arg: SettingsSection) => void
  user: User | null
}

const SettingsMenu: FC<PropsType> = ({ section, onClick, user }) => {
  return (
    <List>
      <ListItemButton
        selected={section === 'interface'}
        onClick={() => onClick('interface')}
        sx={{
          '&.Mui-selected': {
            background: 'none',
            position: 'relative',
            opacity: '1',
          },
          '&:hover': {
            backgroundColor: 'transparent ! important',
            opacity: '1',
          },
          paddingLeft: '25px',
          '& > div:first-of-type': {
            minWidth: '46px',
          },
          opacity: '0.35',
          transition: '0.25s opacity',
        }}
      >
        <ListItemIcon>
          <TuneIcon />
        </ListItemIcon>
        <ListItemText primary="Інтерфейс" />
      </ListItemButton>
      {user && (
        <ListItemButton
          selected={section === 'account'}
          onClick={() => onClick('account')}
          sx={{
            '&.Mui-selected': {
              background: 'none',
              position: 'relative',
              opacity: '1',
            },
            '&:hover': {
              backgroundColor: 'transparent ! important',
              opacity: '1',
            },
            paddingLeft: '25px',
            '& > div:first-of-type': {
              minWidth: '46px',
            },
            opacity: '0.35',
            transition: '0.25s opacity',
          }}
        >
          <ListItemIcon>
            <ManageAccountsIcon />
          </ListItemIcon>
          <ListItemText primary="Аккаунт" />
        </ListItemButton>
      )}
      <ListItemButton
        selected={section === 'info'}
        onClick={() => onClick('info')}
        sx={{
          '&.Mui-selected': {
            background: 'none',
            position: 'relative',
            opacity: '1',
          },
          '&:hover': {
            backgroundColor: 'transparent ! important',
            opacity: '1',
          },
          paddingLeft: '25px',
          '& > div:first-of-type': {
            minWidth: '46px',
          },
          opacity: '0.35',
          transition: '0.25s opacity',
        }}
      >
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="Інформація" />
      </ListItemButton>
    </List>
  )
}

export default SettingsMenu
