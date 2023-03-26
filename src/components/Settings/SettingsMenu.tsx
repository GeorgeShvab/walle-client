import { FC } from 'react'
import { SettingsSection } from '../../../types'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import TuneIcon from '@mui/icons-material/Tune'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'

interface PropsType {
  section: SettingsSection
  onClick: (arg: SettingsSection) => void
}

const SettingsMenu: FC<PropsType> = ({ section, onClick }) => {
  return (
    <List>
      <ListItemButton
        selected={section === 'interface'}
        onClick={() => onClick('interface')}
      >
        <ListItemIcon>
          <TuneIcon />
        </ListItemIcon>
        <ListItemText primary="Інтерфейс" />
      </ListItemButton>
      <ListItemButton
        selected={section === 'account'}
        onClick={() => onClick('account')}
      >
        <ListItemIcon>
          <ManageAccountsIcon />
        </ListItemIcon>
        <ListItemText primary="Аккаунт" />
      </ListItemButton>
    </List>
  )
}

export default SettingsMenu
